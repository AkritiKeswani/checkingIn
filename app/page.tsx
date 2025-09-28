'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Activity, Brain, TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle2 } from "lucide-react";

interface WellnessInsights {
  todayStatus: {
    hasHealthData: boolean;
    hasMentalHealthData: boolean;
    mood: number | null;
    steps: number | null;
    calories: number | null;
  };
  weeklyTrends: {
    avgMood: number;
    avgSteps: number;
    entriesCount: number;
    healthDataCount: number;
    moodTrend: 'improving' | 'declining' | 'stable';
    overallWellnessScore: number;
  };
  suggestions: Array<{
    type: string;
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    action: string;
  }>;
}

export default function HomePage() {
  const [insights, setInsights] = useState<WellnessInsights | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWellnessInsights();
  }, []);

  const loadWellnessInsights = async () => {
    try {
      const response = await fetch('/api/wellness-insights');
      if (response.ok) {
        const data = await response.json();
        setInsights(data);
      }
    } catch (error) {
      console.error('Failed to load wellness insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMoodEmoji = (mood: number) => {
    if (mood >= 4) return "😊";
    if (mood >= 3) return "😐"; 
    return "😔";
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'improving') return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend === 'declining') return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your wellness dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            Your Wellness Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Track your complete wellbeing journey - physical health meets mental wellness
          </p>
        </div>

        {/* Today's Status */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Today's Check-in</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  Physical Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                {insights?.todayStatus.hasHealthData ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Data uploaded today</span>
                    </div>
                    {insights.todayStatus.steps && (
                      <p className="text-lg font-semibold">{insights.todayStatus.steps.toLocaleString()} steps</p>
                    )}
                    {insights.todayStatus.calories && (
                      <p className="text-sm text-gray-600">{insights.todayStatus.calories} calories</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                      <span className="text-sm text-orange-500">No data uploaded today</span>
                    </div>
                    <Link href="/upload">
                      <Button size="sm" variant="outline">Upload Health Screenshot</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  Mental Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                {insights?.todayStatus.hasMentalHealthData ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Journal entry completed</span>
                    </div>
                    {insights.todayStatus.mood && (
                      <p className="text-lg font-semibold flex items-center gap-2">
                        {getMoodEmoji(insights.todayStatus.mood)} Feeling {insights.todayStatus.mood}/5
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                      <span className="text-sm text-orange-500">No check-in today</span>
                    </div>
                    <Link href="/journal">
                      <Button size="sm" variant="outline">Mental Health Check-in</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Weekly Trends */}
        {insights && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">This Week's Overview</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">
                      {insights.weeklyTrends.overallWellnessScore}
                    </div>
                    <p className="text-sm text-gray-600">Overall Wellness</p>
                    <p className="text-xs text-gray-500">out of 10</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {getTrendIcon(insights.weeklyTrends.moodTrend)}
                      <span className="text-2xl font-bold">{insights.weeklyTrends.avgMood}</span>
                    </div>
                    <p className="text-sm text-gray-600">Average Mood</p>
                    <p className="text-xs text-gray-500">
                      {insights.weeklyTrends.moodTrend === 'improving' && 'Trending up 📈'}
                      {insights.weeklyTrends.moodTrend === 'declining' && 'Needs attention 📉'}
                      {insights.weeklyTrends.moodTrend === 'stable' && 'Stable 📊'}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {insights.weeklyTrends.avgSteps.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600">Daily Steps</p>
                    <p className="text-xs text-gray-500">average this week</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {insights.weeklyTrends.entriesCount}
                    </div>
                    <p className="text-sm text-gray-600">Journal Entries</p>
                    <p className="text-xs text-gray-500">this week</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Personalized Suggestions */}
        {insights && insights.suggestions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Personalized Suggestions</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {insights.suggestions.map((suggestion, index) => (
                <Card key={index} className={`${
                  suggestion.priority === 'high' ? 'border-red-200 bg-red-50' :
                  suggestion.priority === 'medium' ? 'border-orange-200 bg-orange-50' :
                  'border-blue-200 bg-blue-50'
                }`}>
                  <CardHeader>
                    <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                    <CardDescription>{suggestion.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium text-gray-700">{suggestion.action}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/upload">
              <Button className="bg-black text-white hover:bg-gray-800">
                <Activity className="mr-2 h-4 w-4" />
                Upload Health Data
              </Button>
            </Link>
            <Link href="/journal">
              <Button variant="outline">
                <Brain className="mr-2 h-4 w-4" />
                Mental Health Check-in
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}