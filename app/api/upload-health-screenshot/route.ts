import { NextRequest, NextResponse } from 'next/server';
import { extractHealthMetrics } from '@/lib/gemini-vision';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No image file uploaded' }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);
    
    // Extract health metrics using Gemini Vision
    const metrics = await extractHealthMetrics(imageBuffer, file.type || 'image/jpeg');
    
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

    return NextResponse.json({ 
      success: true, 
      metrics: healthMetric,
      extractedData: metrics 
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error processing health screenshot:', error);
    return NextResponse.json({ 
      error: 'Failed to process health screenshot',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}