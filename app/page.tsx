import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Camera, 
  Brain, 
  TrendingUp, 
  Shield, 
  Smartphone, 
  Heart,
  Activity,
  Moon
} from "lucide-react";

export const metadata = {
  title: 'CheckingIn - Your AI Wellness Coach',
  description: 'AI-powered wellness coaching through health screenshot analysis',
}

export default function HomePage() {
  return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-full">
                <Brain className="h-16 w-16 text-blue-600" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Complete Wellness Journey Starts Here
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              A holistic daily wellness tracker that combines physical biometrics 
              with mental health check-ins to give you complete insights into 
              your wellbeing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/upload">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-4">
                  <Camera className="mr-2 h-5 w-5" />
                  Upload Health Screenshot
                </Button>
              </Link>
              <Link href="/analysis">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Mental Health Check-in
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              How CheckingIn Works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Smartphone className="h-12 w-12 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">1. Upload Screenshot</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Share screenshots from any health app - Apple Health, Fitbit, Oura, Whoop, or others.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Brain className="h-12 w-12 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">2. AI Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Our AI extracts health metrics and analyzes patterns in your sleep, recovery, and activity data.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Heart className="h-12 w-12 text-red-600" />
                  </div>
                  <CardTitle className="text-xl">3. Personal Guidance</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Receive personalized wellness tips, mindfulness techniques, and actionable health recommendations.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Metrics Showcase */}
        <section className="container mx-auto px-4 py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Track What Matters Most
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <Moon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">Sleep Quality</h3>
                <p className="text-sm text-gray-600 mt-1">Hours & recovery</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <Heart className="h-8 w-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">Heart Health</h3>
                <p className="text-sm text-gray-600 mt-1">HRV & resting HR</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <Activity className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">Activity</h3>
                <p className="text-sm text-gray-600 mt-1">Steps & strain</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">Recovery</h3>
                <p className="text-sm text-gray-600 mt-1">Scores & trends</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Start Your Wellness Journey Today
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands who are taking control of their health with AI-powered insights.
            </p>
            
            <Link href="/upload">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg px-12 py-4">
                Get Started Free
                <Camera className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
  );
}