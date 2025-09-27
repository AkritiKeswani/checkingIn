import type { NextApiRequest, NextApiResponse } from 'next';
import { extractHealthMetrics } from '@/lib/gemini-vision';
import { prisma } from '@/lib/prisma';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let uploadedFile: formidable.File | undefined;
  
  try {
    // Parse the form data
    const form = formidable({});
    const [fields, files] = await form.parse(req);
    
    uploadedFile = Array.isArray(files.image) ? files.image[0] : files.image;
    
    if (!uploadedFile) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    // Read the uploaded file
    const imageBuffer = fs.readFileSync(uploadedFile.filepath);
    
    // Extract health metrics using Gemini Vision
    const metrics = await extractHealthMetrics(imageBuffer, uploadedFile.mimetype || 'image/jpeg');
    
    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Store in database (upsert for today's date)
    const healthMetric = await prisma.healthMetric.upsert({
      where: { date: today },
      update: {
        sleepHours: metrics.sleepHours,
        recoveryPercent: metrics.recoveryPercent,
        strain: metrics.strain,
        hrv: metrics.hrv,
        restingHeartRate: metrics.restingHeartRate,
        steps: metrics.steps,
        calories: metrics.calories,
      },
      create: {
        date: today,
        sleepHours: metrics.sleepHours,
        recoveryPercent: metrics.recoveryPercent,
        strain: metrics.strain,
        hrv: metrics.hrv,
        restingHeartRate: metrics.restingHeartRate,
        steps: metrics.steps,
        calories: metrics.calories,
      },
    });

    // Clean up the temporary file
    fs.unlinkSync(uploadedFile.filepath);

    res.status(200).json({ 
      success: true, 
      metrics: healthMetric,
      extractedData: metrics 
    });
  } catch (error) {
    // Clean up temp file if it exists
    if (uploadedFile?.filepath) {
      try {
        fs.unlinkSync(uploadedFile.filepath);
      } catch (cleanupError) {
        console.error('Error cleaning up temp file:', cleanupError);
      }
    }
    
    console.error('Error processing health screenshot:', error);
    res.status(500).json({ 
      error: 'Failed to process health screenshot',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}