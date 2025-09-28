'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Brain, Heart, Moon, Activity, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AnalysisPage() {
  const [healthData, setHealthData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This would fetch the latest health data from your API
    // For now, we'll simulate with mock data
    setLoading(false);
    setHealthData({
      sleepHours: 7.5,
      recoveryPercent: 85,
      strain: 12.3,
      hrv: 42,
      restingHeartRate: 58,
      steps: 8245,
      calories: 2134
    });
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your health analysis...</p>
        </div>
      </main>
    );
  }

  if (!healthData) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">No Health Data Found</h1>
          <p className="text-lg text-gray-600 mb-8">Upload a health screenshot to see your analysis.</p>
          <Link href="/upload">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
              Upload Screenshot
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <TrendingUp className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Health Analysis
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              AI-powered insights based on your latest health metrics
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <Card className="text-center">
              <CardHeader className="pb-2">
                <Moon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Sleep</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">{healthData.sleepHours}h</p>
                <p className="text-sm text-gray-600">Good quality</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-2">
                <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Recovery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">{healthData.recoveryPercent}%</p>
                <p className="text-sm text-gray-600">Excellent</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-2">
                <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg">HRV</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">{healthData.hrv}ms</p>
                <p className="text-sm text-gray-600">Above average</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-2">
                <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">{healthData.steps.toLocaleString()}</p>
                <p className="text-sm text-gray-600">82% of goal</p>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-purple-600" />
                AI Health Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                <h3 className="font-semibold text-green-800 mb-2">🎉 Great Recovery Score</h3>
                <p className="text-green-700">Your 85% recovery score indicates excellent adaptation to recent training. Your body is ready for moderate to high intensity activities.</p>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <h3 className="font-semibold text-blue-800 mb-2">😴 Optimal Sleep Duration</h3>
                <p className="text-blue-700">7.5 hours of sleep is within the optimal range. Your sleep consistency is supporting good recovery and cognitive performance.</p>
              </div>
              
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
                <h3 className="font-semibold text-amber-800 mb-2">💪 Activity Recommendation</h3>
                <p className="text-amber-700">Based on your current strain and recovery, consider a moderate workout today. Your HRV suggests good autonomic balance.</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/guidance">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600">
                Get Personalized Guidance
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/journal">
              <Button variant="outline" size="lg">
                Start Journal Entry
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}