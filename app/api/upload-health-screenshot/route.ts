import { NextRequest, NextResponse } from 'next/server';
import { extractHealthMetrics } from '@/lib/gemini-vision';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
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
    
    // Use the date from the health data, or fall back to today
    let dataDate = new Date();
    if (metrics.date) {
      try {
        dataDate = new Date(metrics.date);
        // Validate it's a reasonable date (not in future, not too old)
        const now = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(now.getFullYear() - 1);
        
        if (dataDate > now) {
          console.log(`Date ${metrics.date} is in future, using today instead`);
          dataDate = new Date();
        } else if (dataDate < oneYearAgo) {
          console.log(`Date ${metrics.date} is too old, using today instead`);
          dataDate = new Date();
        }
      } catch (error) {
        console.log(`Invalid date format: ${metrics.date}, using today instead`);
        dataDate = new Date();
      }
    }
    dataDate.setHours(0, 0, 0, 0);
    
    console.log(`Storing health data for date: ${dataDate.toISOString().split('T')[0]}`);
    
    // Store in database (upsert for the actual data date)
    const healthMetric = await prisma.healthMetric.upsert({
      where: { 
        userId_date: {
          userId: user.id,
          date: dataDate
        }
      },
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
        userId: user.id,
        date: dataDate,
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