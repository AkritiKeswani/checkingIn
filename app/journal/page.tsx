'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// Using HTML textarea since Textarea component not available
import { Input } from "@/components/ui/input";
import { Book, Save, Calendar, Smile, Meh, Frown, Star } from "lucide-react";

interface WeekStats {
  totalEntries: number;
  avgMood: number;
  streak: number;
}

export default function JournalPage() {
  const [entry, setEntry] = useState("");
  const [mood, setMood] = useState<number | null>(null);
  const [gratitude, setGratitude] = useState("");
  const [goals, setGoals] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [weekStats, setWeekStats] = useState<WeekStats>({ totalEntries: 0, avgMood: 0, streak: 0 });

  const moods = [
    { value: 5, icon: <Smile className="h-6 w-6" />, label: "Great", color: "text-green-600" },
    { value: 4, icon: <Smile className="h-6 w-6" />, label: "Good", color: "text-green-500" },
    { value: 3, icon: <Meh className="h-6 w-6" />, label: "Okay", color: "text-yellow-500" },
    { value: 2, icon: <Frown className="h-6 w-6" />, label: "Low", color: "text-orange-500" },
    { value: 1, icon: <Frown className="h-6 w-6" />, label: "Poor", color: "text-red-500" },
  ];

  // Load stats on component mount
  useEffect(() => {
    loadWeekStats();
  }, []);

  // Update stats when form fields change (real-time preview)
  useEffect(() => {
    if (mood || entry || gratitude || goals) {
      // Calculate potential new stats if this entry was saved
      const potentialNewTotal = weekStats.totalEntries + 1;
      const potentialNewAvgMood = mood 
        ? ((weekStats.avgMood * weekStats.totalEntries) + mood) / potentialNewTotal
        : weekStats.avgMood;
      
      // Don't update actual stats until saved, just show preview
      setWeekStats(prev => ({
        ...prev,
        // Show preview of what stats would be if saved
      }));
    }
  }, [mood, entry, gratitude, goals]);

  const loadWeekStats = async () => {
    try {
      const response = await fetch('/api/journal-entries');
      const data = await response.json();
      if (data.stats) {
        setWeekStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to load week stats:', error);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/journal-entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, entry, gratitude, goals })
      });
      
      if (response.ok) {
        // Reset form
        setEntry("");
        setMood(null);
        setGratitude("");
        setGoals("");
        
        // Reload stats with new data
        await loadWeekStats();
        
        alert("Journal entry saved successfully!");
      } else {
        throw new Error('Failed to save entry');
      }
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('Failed to save journal entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const prompts = [
    "How did I feel physically and mentally today?",
    "What activities gave me the most energy?",
    "What challenges did I overcome today?",
    "How well did I take care of my body today?",
    "What did I learn about my health patterns?",
    "How can I better support my wellness tomorrow?"
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-purple-100 p-4 rounded-full">
                <Book className="h-12 w-12 text-purple-600" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Wellness Journal
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Reflect on your health journey and track your progress over time
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Journal Entry Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Mood Tracker */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smile className="h-6 w-6 text-yellow-600" />
                    How are you feeling today?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between gap-2">
                    {moods.map((moodOption) => (
                      <button
                        key={moodOption.value}
                        onClick={() => setMood(moodOption.value)}
                        className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                          mood === moodOption.value
                            ? 'border-purple-400 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className={moodOption.color}>
                          {moodOption.icon}
                        </div>
                        <span className="text-sm mt-1 font-medium">{moodOption.label}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Main Journal Entry */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-blue-600" />
                    Today's Reflection
                  </CardTitle>
                  <CardDescription>
                    Write about your wellness journey, challenges, victories, and insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <textarea
                    placeholder="How was your day? What did you learn about your health and wellness? Any insights or patterns you noticed?"
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    className="w-full min-h-32 resize-none p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={6}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    {entry.length} characters
                  </p>
                </CardContent>
              </Card>

              {/* Gratitude Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-6 w-6 text-yellow-600" />
                    What are you grateful for?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="I'm grateful for..."
                    value={gratitude}
                    onChange={(e) => setGratitude(e.target.value)}
                  />
                </CardContent>
              </Card>

              {/* Tomorrow's Goals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-6 w-6 text-green-600" />
                    Tomorrow's Wellness Goal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Tomorrow I will focus on..."
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                  />
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting || (!entry && !mood && !gratitude && !goals)}
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving Entry...
                  </div>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Journal Entry
                  </>
                )}
              </Button>
            </div>

            {/* Sidebar with Prompts */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">💡 Writing Prompts</CardTitle>
                  <CardDescription>
                    Use these questions to guide your reflection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {prompts.map((prompt, index) => (
                      <div key={index} className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded">
                        <p className="text-sm text-purple-800">{prompt}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">📊 This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Journal entries</span>
                      <span className="font-semibold">{weekStats.totalEntries} / 7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Avg mood</span>
                      <span className="font-semibold">{weekStats.avgMood} / 5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Streak</span>
                      <span className="font-semibold">{weekStats.streak} days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}