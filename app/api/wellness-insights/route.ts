import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // Get recent health metrics and mental health data
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Get latest health metrics
    const recentHealthMetrics = await prisma.healthMetric.findMany({
      where: {
        userId: user.id,
        date: {
          gte: weekAgo
        }
      },
      orderBy: {
        date: 'desc'
      },
      take: 7
    });

    // Get recent mental health entries
    const recentMentalHealth = await prisma.mentalHealth.findMany({
      where: {
        userId: user.id,
        date: {
          gte: weekAgo
        }
      },
      orderBy: {
        date: 'desc'
      },
      take: 7
    });

    // Calculate today's status
    const todayHealthMetrics = recentHealthMetrics.find(m => 
      m.date.toDateString() === today.toDateString()
    );
    const todayMentalHealth = recentMentalHealth.find(m => 
      m.date.toDateString() === today.toDateString()
    );

    // Calculate weekly trends
    const weeklyMoodTrend = recentMentalHealth.length > 0 
      ? recentMentalHealth.reduce((sum, entry) => sum + entry.mood, 0) / recentMentalHealth.length
      : 0;

    const weeklyStepsTrend = recentHealthMetrics.length > 0
      ? recentHealthMetrics
          .filter(m => m.steps !== null)
          .reduce((sum, entry) => sum + (entry.steps || 0), 0) / 
        Math.max(1, recentHealthMetrics.filter(m => m.steps !== null).length)
      : 0;

    // Generate suggestions based on data
    const suggestions = generateSuggestions(recentHealthMetrics, recentMentalHealth, weeklyMoodTrend);

    // Calculate overall wellness score
    const physicalScore = calculatePhysicalWellnessScore(recentHealthMetrics);
    const mentalScore = weeklyMoodTrend * 2; // Convert 1-5 scale to 1-10
    const overallScore = Math.round(((physicalScore + mentalScore) / 2) * 10) / 10;

    return NextResponse.json({
      todayStatus: {
        hasHealthData: !!todayHealthMetrics,
        hasMentalHealthData: !!todayMentalHealth,
        mood: todayMentalHealth?.mood || null,
        steps: todayHealthMetrics?.steps || null,
        calories: todayHealthMetrics?.calories || null
      },
      weeklyTrends: {
        avgMood: Math.round(weeklyMoodTrend * 10) / 10,
        avgSteps: Math.round(weeklyStepsTrend),
        entriesCount: recentMentalHealth.length,
        healthDataCount: recentHealthMetrics.length,
        moodTrend: calculateMoodTrend(recentMentalHealth),
        overallWellnessScore: overallScore
      },
      suggestions,
      weeklyData: {
        mentalHealth: recentMentalHealth.map(entry => ({
          date: entry.date,
          mood: entry.mood,
          gratitude: entry.gratitude
        })),
        physicalHealth: recentHealthMetrics.map(metric => ({
          date: metric.date,
          steps: metric.steps,
          calories: metric.calories,
          sleepHours: metric.sleepHours,
          recoveryPercent: metric.recoveryPercent
        }))
      }
    });
  } catch (error) {
    console.error('Error fetching wellness insights:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wellness insights' },
      { status: 500 }
    );
  }
}

function generateSuggestions(healthMetrics: any[], mentalHealth: any[], avgMood: number) {
  const suggestions = [];

  // Mental health suggestions
  if (avgMood < 3) {
    suggestions.push({
      type: 'mental',
      priority: 'high',
      title: 'Focus on Mental Wellness',
      description: 'Your mood has been lower this week. Consider practicing mindfulness or reaching out to someone you trust.',
      action: 'Try journaling about positive moments or speaking with a counselor'
    });
  } else if (avgMood > 4) {
    suggestions.push({
      type: 'mental',
      priority: 'low',
      title: 'Maintain Your Positive Momentum',
      description: 'You\'re doing great this week! Keep up the habits that are working for you.',
      action: 'Consider sharing what\'s working well with others'
    });
  }

  // Physical health suggestions
  const recentSteps = healthMetrics.filter(m => m.steps !== null);
  if (recentSteps.length > 0) {
    const avgSteps = recentSteps.reduce((sum, m) => sum + (m.steps || 0), 0) / recentSteps.length;
    
    if (avgSteps < 6000) {
      suggestions.push({
        type: 'physical',
        priority: 'medium',
        title: 'Increase Daily Movement',
        description: 'Your step count has been below recommended levels. Try to incorporate more walking into your routine.',
        action: 'Aim for 7,000+ steps daily with short walks throughout the day'
      });
    }
  }

  // Sleep suggestions
  const recentSleep = healthMetrics.filter(m => m.sleepHours !== null);
  if (recentSleep.length > 0) {
    const avgSleep = recentSleep.reduce((sum, m) => sum + (m.sleepHours || 0), 0) / recentSleep.length;
    
    if (avgSleep < 7) {
      suggestions.push({
        type: 'physical',
        priority: 'high',
        title: 'Prioritize Better Sleep',
        description: 'You\'re averaging less than 7 hours of sleep. Quality sleep is crucial for both physical and mental health.',
        action: 'Try setting a consistent bedtime and avoiding screens 1 hour before sleep'
      });
    }
  }

  // Recovery suggestions
  const recentRecovery = healthMetrics.filter(m => m.recoveryPercent !== null);
  if (recentRecovery.length > 0) {
    const avgRecovery = recentRecovery.reduce((sum, m) => sum + (m.recoveryPercent || 0), 0) / recentRecovery.length;
    
    if (avgRecovery < 70) {
      suggestions.push({
        type: 'recovery',
        priority: 'medium',
        title: 'Focus on Recovery',
        description: 'Your recovery scores suggest you may need more rest or stress management.',
        action: 'Consider lighter workouts and stress-reduction techniques like meditation'
      });
    }
  }

  return suggestions.slice(0, 3); // Return top 3 suggestions
}

function calculatePhysicalWellnessScore(metrics: any[]) {
  if (metrics.length === 0) return 5; // neutral score

  let score = 5;
  let factors = 0;

  // Steps factor
  const stepsData = metrics.filter(m => m.steps !== null);
  if (stepsData.length > 0) {
    const avgSteps = stepsData.reduce((sum, m) => sum + (m.steps || 0), 0) / stepsData.length;
    if (avgSteps >= 10000) score += 1.5;
    else if (avgSteps >= 7000) score += 0.5;
    else if (avgSteps < 5000) score -= 1;
    factors++;
  }

  // Sleep factor
  const sleepData = metrics.filter(m => m.sleepHours !== null);
  if (sleepData.length > 0) {
    const avgSleep = sleepData.reduce((sum, m) => sum + (m.sleepHours || 0), 0) / sleepData.length;
    if (avgSleep >= 7 && avgSleep <= 9) score += 1.5;
    else if (avgSleep >= 6) score += 0.5;
    else score -= 1;
    factors++;
  }

  // Recovery factor
  const recoveryData = metrics.filter(m => m.recoveryPercent !== null);
  if (recoveryData.length > 0) {
    const avgRecovery = recoveryData.reduce((sum, m) => sum + (m.recoveryPercent || 0), 0) / recoveryData.length;
    if (avgRecovery >= 80) score += 1.5;
    else if (avgRecovery >= 70) score += 0.5;
    else if (avgRecovery < 60) score -= 1;
    factors++;
  }

  return Math.max(1, Math.min(10, score));
}

function calculateMoodTrend(entries: any[]) {
  if (entries.length < 2) return 'stable';
  
  const sortedEntries = [...entries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const firstHalf = sortedEntries.slice(0, Math.ceil(sortedEntries.length / 2));
  const secondHalf = sortedEntries.slice(Math.ceil(sortedEntries.length / 2));
  
  const firstHalfAvg = firstHalf.reduce((sum, e) => sum + e.mood, 0) / firstHalf.length;
  const secondHalfAvg = secondHalf.reduce((sum, e) => sum + e.mood, 0) / secondHalf.length;
  
  const diff = secondHalfAvg - firstHalfAvg;
  
  if (diff > 0.5) return 'improving';
  if (diff < -0.5) return 'declining';
  return 'stable';
}