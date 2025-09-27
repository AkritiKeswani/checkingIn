import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Camera, Heart, TrendingUp, Smartphone, Brain, BarChart3 } from "lucide-react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>CheckingIn - Holistic Daily Wellness Tracker</title>
        <meta name="description" content="Track your physical biometrics and mental health in one unified dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="flex justify-center mb-6">
            <Activity className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            CheckingIn
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A holistic daily wellness tracker that combines physical biometrics with mental health check-ins
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/snap">
              <Button size="lg" className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Upload Health Screenshot
              </Button>
            </Link>
            <Link href="/checkin">
              <Button size="lg" variant="outline" className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Mental Health Check-in
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How CheckingIn Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Smartphone className="h-12 w-12 text-blue-600" />
                </div>
                <CardTitle>Snap Your Metrics</CardTitle>
                <CardDescription>
                  Upload screenshots from fitness trackers, health apps, or wearables
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Our AI extracts sleep hours, heart rate variability, recovery scores, steps, and more from your screenshots using advanced vision technology.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Brain className="h-12 w-12 text-purple-600" />
                </div>
                <CardTitle>Mental Check-in</CardTitle>
                <CardDescription>
                  Track mood, anxiety, energy, stress, and focus with interactive sliders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Daily journaling, gratitude practice, and trigger identification help you understand your mental health patterns and growth.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <BarChart3 className="h-12 w-12 text-green-600" />
                </div>
                <CardTitle>Unified Insights</CardTitle>
                <CardDescription>
                  Discover correlations between physical and mental health
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Advanced analytics reveal how your sleep affects mood, exercise impacts stress, and recovery influences focus.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Start Your Wellness Journey Today
            </h3>
            <p className="text-gray-600 mb-6">
              Take the first step towards understanding the connection between your physical and mental health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/snap">
                <Button size="lg">Upload First Screenshot</Button>
              </Link>
              <Link href="/insights">
                <Button size="lg" variant="outline">View Demo Insights</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
