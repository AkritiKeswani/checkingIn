import type { NextPage } from "next";
import Head from "next/head";
import { useState, useCallback } from "react";
import { useRouter } from "next/router";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, Loader2, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

interface HealthMetrics {
  sleepHours?: number;
  recoveryPercent?: number;
  strain?: number;
  hrv?: number;
  restingHeartRate?: number;
  steps?: number;
  calories?: number;
}

const UploadPage: NextPage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{
    success: boolean;
    metrics?: HealthMetrics;
    error?: string;
  } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const router = useRouter();

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setUploadResult(null);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        handleFileSelect(file);
      }
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('/api/upload-health-screenshot', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadResult({
          success: true,
          metrics: result.extractedData,
        });
      } else {
        setUploadResult({
          success: false,
          error: result.error || 'Upload failed',
        });
      }
    } catch (error) {
      setUploadResult({
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleViewAnalysis = () => {
    router.push('/analysis');
  };

  const MetricCard = ({ label, value, unit }: { label: string; value?: number; unit?: string }) => (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 border shadow-sm">
      <p className="text-sm text-gray-600 mb-1 font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-900">
        {value !== null && value !== undefined ? `${value}${unit || ''}` : '---'}
      </p>
    </div>
  );

  return (
    <>
      <Head>
        <title>Upload Health Screenshot - CheckingIn</title>
        <meta name="description" content="Upload screenshots to extract health metrics automatically with AI vision" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Camera className="h-12 w-12 text-blue-600" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Upload Your Health Screenshot
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Share a screenshot from your fitness tracker or health app. Our AI will automatically extract 
                your health metrics and provide personalized wellness insights.
              </p>
            </div>

            {/* Upload Section */}
            <Card className="mb-8 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Upload className="h-6 w-6" />
                  Drag & Drop or Browse
                </CardTitle>
                <CardDescription>
                  Supported: Apple Health, Fitbit, Oura Ring, Whoop, Garmin, and other health apps (JPG, PNG)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Drag and Drop Zone */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`
                    border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
                    ${isDragOver 
                      ? 'border-blue-400 bg-blue-50' 
                      : selectedFile 
                        ? 'border-green-400 bg-green-50' 
                        : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
                    }
                  `}
                >
                  {previewUrl ? (
                    <div className="space-y-4">
                      <img 
                        src={previewUrl} 
                        alt="Health screenshot preview" 
                        className="max-w-full h-48 object-contain rounded-lg mx-auto border shadow-sm"
                      />
                      <p className="text-sm font-medium text-green-700">
                        ✓ Screenshot ready for analysis
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <Upload className="h-12 w-12 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-700">
                          Drop your health screenshot here
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          or click browse to select a file
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="mt-4 inline-block cursor-pointer"
                  >
                    <Button variant="outline" size="lg" className="pointer-events-none">
                      <Upload className="mr-2 h-4 w-4" />
                      Browse Files
                    </Button>
                  </label>
                </div>

                {/* Analyze Button */}
                <Button 
                  onClick={handleUpload} 
                  disabled={!selectedFile || isUploading}
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing Screenshot with AI...
                    </>
                  ) : (
                    <>
                      <Camera className="mr-2 h-5 w-5" />
                      Extract Health Metrics
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            {uploadResult && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {uploadResult.success ? (
                      <>
                        <CheckCircle className="h-6 w-6 text-green-600" />
                        Health Metrics Extracted
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-6 w-6 text-red-600" />
                        Analysis Failed
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {uploadResult.success && uploadResult.metrics ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <MetricCard 
                          label="Sleep Duration" 
                          value={uploadResult.metrics.sleepHours} 
                          unit="h" 
                        />
                        <MetricCard 
                          label="Recovery Score" 
                          value={uploadResult.metrics.recoveryPercent} 
                          unit="%" 
                        />
                        <MetricCard 
                          label="Daily Strain" 
                          value={uploadResult.metrics.strain} 
                        />
                        <MetricCard 
                          label="Heart Rate Variability" 
                          value={uploadResult.metrics.hrv} 
                          unit="ms" 
                        />
                        <MetricCard 
                          label="Resting Heart Rate" 
                          value={uploadResult.metrics.restingHeartRate} 
                          unit=" bpm" 
                        />
                        <MetricCard 
                          label="Daily Steps" 
                          value={uploadResult.metrics.steps} 
                        />
                        <MetricCard 
                          label="Calories Burned" 
                          value={uploadResult.metrics.calories} 
                          unit=" cal" 
                        />
                      </div>
                      
                      <div className="flex justify-center pt-4">
                        <Button 
                          onClick={handleViewAnalysis}
                          size="lg"
                          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                        >
                          View Detailed Analysis & Insights
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Analysis Failed</h3>
                      <p className="text-gray-600 mb-4">{uploadResult.error}</p>
                      <Button 
                        onClick={() => setUploadResult(null)}
                        variant="outline"
                      >
                        Try Again
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Tips Section */}
            <Card className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 shadow-md">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Tips for Best Results
                </CardTitle>
              </CardHeader>
              <CardContent className="text-blue-800">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">📱 Screenshot Quality</h4>
                    <ul className="space-y-1">
                      <li>• Clear, high-resolution images work best</li>
                      <li>• Ensure all text and numbers are readable</li>
                      <li>• Include metric labels for context</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">⌚ Supported Apps</h4>
                    <ul className="space-y-1">
                      <li>• Apple Health & Apple Watch</li>
                      <li>• Fitbit, Oura Ring, Whoop Strap</li>
                      <li>• Garmin Connect, Strava</li>
                      <li>• Most fitness and health apps</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
};

export default UploadPage;