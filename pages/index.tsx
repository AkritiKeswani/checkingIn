import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Upload, Brain } from "lucide-react";

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
        <header className="px-4 py-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                  <Heart className="w-4 h-4 text-background" />
                </div>
                <h1 className="text-xl font-semibold text-foreground">CheckingIn</h1>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Features
                </a>
                <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  How it Works
                </a>
                <button className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Sign In
                </button>
                <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 rounded-lg px-4 py-2">
                  Get Started
                </Button>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Your Complete Wellness
                <br />
                Journey Starts Here
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A holistic daily wellness tracker that combines physical biometrics 
                with mental health check-ins to give you complete insights into 
                your wellbeing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/snap">
                  <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-lg px-6 py-3 text-base font-medium">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Health Screenshot
                  </Button>
                </Link>
                <Link href="/checkin">
                  <Button variant="outline" size="lg" className="border-border text-foreground hover:bg-muted rounded-lg px-6 py-3 text-base font-medium">
                    <Brain className="w-5 h-5 mr-2" />
                    Mental Health Check-in
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
