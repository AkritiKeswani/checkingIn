'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Brain, Leaf, CheckCircle, Play, Book } from "lucide-react";
import Link from "next/link";

export default function GuidancePage() {
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());

  const toggleAction = (actionId: string) => {
    const newCompleted = new Set(completedActions);
    if (newCompleted.has(actionId)) {
      newCompleted.delete(actionId);
    } else {
      newCompleted.add(actionId);
    }
    setCompletedActions(newCompleted);
  };

  const recommendations = [
    {
      id: "hydration",
      title: "Optimize Hydration",
      description: "Based on your recovery score, increase water intake to support muscle recovery",
      action: "Drink 16oz of water now and set hourly reminders",
      category: "physical"
    },
    {
      id: "movement", 
      title: "Active Recovery",
      description: "Your HRV suggests you're ready for light movement to boost circulation",
      action: "Take a 10-minute walk or do gentle stretching",
      category: "physical"
    },
    {
      id: "nutrition",
      title: "Recovery Nutrition",
      description: "Support your 85% recovery with protein-rich post-workout nutrition",
      action: "Have a protein snack within 2 hours of your workout",
      category: "physical"
    }
  ];

  const mindfulnessTechniques = [
    {
      id: "breathing",
      title: "4-7-8 Breathing",
      description: "Reduce stress and improve sleep quality with this calming technique",
      duration: "5 minutes",
      steps: [
        "Inhale through nose for 4 counts",
        "Hold breath for 7 counts", 
        "Exhale through mouth for 8 counts",
        "Repeat 4-6 cycles"
      ]
    },
    {
      id: "body-scan",
      title: "Progressive Body Scan",
      description: "Release tension and increase body awareness",
      duration: "10 minutes",
      steps: [
        "Lie down comfortably",
        "Start from your toes, notice any sensations",
        "Slowly move up through each body part",
        "Breathe into areas of tension"
      ]
    }
  ];

  const journalPrompts = [
    "How did I feel physically and mentally today?",
    "What activities gave me the most energy?",
    "What challenges did I overcome today?",
    "What am I grateful for in my health journey?",
    "How can I better support my recovery tomorrow?"
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <Heart className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Personalized Wellness Guidance
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tailored recommendations based on your current health metrics and recovery state
            </p>
          </div>

          {/* Physical Health Recommendations */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-red-600" />
                Physical Wellness Actions
              </CardTitle>
              <CardDescription>
                Immediate steps to optimize your physical health based on today's metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <button
                      onClick={() => toggleAction(rec.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 transition-colors ${
                        completedActions.has(rec.id)
                          ? 'bg-green-600 border-green-600 text-white'
                          : 'border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {completedActions.has(rec.id) && <CheckCircle className="h-4 w-4" />}
                    </button>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{rec.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{rec.description}</p>
                      <p className="text-green-700 font-medium text-sm">{rec.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mindfulness Techniques */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-green-600" />
                Mindfulness & Stress Relief
              </CardTitle>
              <CardDescription>
                Techniques to enhance mental clarity and reduce stress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {mindfulnessTechniques.map((technique) => (
                  <Card key={technique.id} className="border-2 border-green-100">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Play className="h-5 w-5 text-green-600" />
                        {technique.title}
                      </CardTitle>
                      <CardDescription>{technique.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">Duration: {technique.duration}</p>
                      <div className="space-y-2">
                        {technique.steps.map((step, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                              {index + 1}
                            </span>
                            <p className="text-sm text-gray-700">{step}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Journal Prompts */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-6 w-6 text-purple-600" />
                Guided Journal Prompts
              </CardTitle>
              <CardDescription>
                Reflection questions to deepen your wellness journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {journalPrompts.map((prompt, index) => (
                  <div key={index} className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded">
                    <p className="text-purple-800 font-medium">{prompt}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link href="/journal">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600">
                    Start Journaling
                    <Book className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Progress Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-blue-600" />
                Today's Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {completedActions.size} / {recommendations.length}
                  </p>
                  <p className="text-gray-600">Actions completed</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-green-600">
                    {Math.round((completedActions.size / recommendations.length) * 100)}%
                  </p>
                  <p className="text-gray-600">Wellness goals</p>
                </div>
              </div>
              
              <div className="mt-4 bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(completedActions.size / recommendations.length) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}