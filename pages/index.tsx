import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Brain, BarChart3, Upload, Heart, TrendingUp } from "lucide-react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>CheckingIn - Holistic Wellness Tracker</title>
        <meta name="description" content="A holistic daily wellness tracker that combines physical biometrics with mental health check-ins" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold text-foreground">CheckingIn</h1>
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                  How it Works
                </a>
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
                <Button size="sm">Get Started</Button>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
                Your Complete
                <span className="text-primary"> Wellness</span>
                <br />
                Journey Starts Here
              </h1>
              <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
                A holistic daily wellness tracker that combines physical biometrics with mental health check-ins to give
                you complete insights into your wellbeing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/snap">
                  <Button size="lg" className="text-lg px-8">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Health Screenshot
                  </Button>
                </Link>
                <Link href="/checkin">
                  <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                    <Brain className="w-5 h-5 mr-2" />
                    Mental Health Check-in
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How CheckingIn Works */}
        <section id="how-it-works" className="py-20 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How CheckingIn Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Three simple steps to transform your wellness tracking experience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Snap Your Metrics */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <Smartphone className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Snap Your Metrics</h3>
                  <p className="text-muted-foreground mb-6">
                    Upload screenshots from fitness trackers, health apps, or wearables
                  </p>
                  <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">
                    Our AI extracts sleep hours, heart rate variability, recovery scores, steps, and more from your
                    screenshots using advanced vision technology.
                  </div>
                </CardContent>
              </Card>

              {/* Mental Check-in */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                    <Brain className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Mental Check-in</h3>
                  <p className="text-muted-foreground mb-6">
                    Track mood, anxiety, energy, stress, and focus with interactive sliders
                  </p>
                  <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">
                    Daily journaling, gratitude practice, and trigger identification help you understand your mental
                    health patterns and growth.
                  </div>
                </CardContent>
              </Card>

              {/* Unified Insights */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <BarChart3 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Unified Insights</h3>
                  <p className="text-muted-foreground mb-6">Discover correlations between physical and mental health</p>
                  <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">
                    Advanced analytics reveal how your sleep affects mood, exercise impacts stress, and recovery
                    influences focus.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-12">
              <TrendingUp className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Wellness Journey Today</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Take the first step towards understanding the connection between your physical and mental health.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/snap">
                  <Button size="lg" className="text-lg px-8">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload First Screenshot
                  </Button>
                </Link>
                <Link href="/insights">
                  <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                    View Demo Insights
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-semibold">CheckingIn</span>
              </div>
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  Support
                </a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
              © 2025 CheckingIn. Built for your wellness journey.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
