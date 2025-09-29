import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const { mood, entry, gratitude, goals } = body;

    // Create journal entry
    const journalEntry = await prisma.mentalHealth.create({
      data: {
        userId: user.id,
        date: new Date(),
        mood: mood || 3,
        anxiety: 3, // default neutral values
        energy: 3,
        stress: 3, 
        focus: 3,
        journal: entry || null,
        gratitude: gratitude || null,
        triggers: goals || null, // using triggers field for goals temporarily
      }
    });

    return NextResponse.json({ success: true, entry: journalEntry });
  } catch (error) {
    console.error('Error saving journal entry:', error);
    return NextResponse.json(
      { error: 'Failed to save journal entry', details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // Get journal entries for the current week
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const entries = await prisma.mentalHealth.findMany({
      where: {
        userId: user.id,
        date: {
          gte: weekAgo
        }
      },
      orderBy: {
        date: 'desc'
      }
    });

    // Calculate stats
    const totalEntries = entries.length;
    const entriesWithMood = entries.filter(entry => entry.mood !== null);
    const avgMood = entriesWithMood.length > 0 
      ? entriesWithMood.reduce((sum, entry) => sum + (entry.mood || 0), 0) / entriesWithMood.length
      : 0;
    
    // Calculate streak (consecutive days with entries)
    const allEntries = await prisma.mentalHealth.findMany({
      where: { userId: user.id },
      orderBy: { date: 'desc' }
    });
    
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < allEntries.length; i++) {
      const entryDate = new Date(allEntries[i].date);
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      
      if (entryDate.toDateString() === expectedDate.toDateString()) {
        streak++;
      } else {
        break;
      }
    }

    return NextResponse.json({
      entries,
      stats: {
        totalEntries,
        avgMood: Number(avgMood.toFixed(1)),
        streak
      }
    });
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch journal entries' },
      { status: 500 }
    );
  }
}