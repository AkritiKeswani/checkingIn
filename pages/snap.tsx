import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Camera, Upload, Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface HealthMetrics {
  sleepHours?: number;
  recoveryPercent?: number;
  strain?: number;
  hrv?: number;
  restingHeartRate?: number;
  steps?: number;
  calories?: number;
}

const Snap: NextPage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{
    success: boolean;
    metrics?: HealthMetrics;
    error?: string;
  } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadResult(null);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

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

  const MetricCard = ({ label, value, unit }: { label: string; value?: number; unit?: string }) => (
    <div className="bg-gray-50 rounded-lg p-4">
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">
        {value !== null && value !== undefined ? `${value}${unit || ''}` : '---'}
      </p>
    </div>
  );

  return (
    <>
      <Head>
        <title>Snap Health Metrics - CheckingIn</title>
        <meta name="description" content="Upload screenshots to extract health metrics automatically" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <Camera className="h-12 w-12 text-blue-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Snap Your Health Metrics
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Upload a screenshot from your fitness tracker, health app, or wearable device. 
                Our AI will automatically extract your health metrics.
              </p>
            </div>

            {/* Upload Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Health Screenshot
                </CardTitle>
                <CardDescription>
                  Supported formats: JPG, PNG. Screenshots from Apple Health, Fitbit, Oura, Whoop, Garmin, etc.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  
                  {previewUrl && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Preview:</p>
                      <img 
                        src={previewUrl} 
                        alt="Health screenshot preview" 
                        className="max-w-full h-48 object-contain rounded-lg border"
                      />
                    </div>
                  )}

                  <Button 
                    onClick={handleUpload} 
                    disabled={!selectedFile || isUploading}
                    size="lg"
                    className="w-full"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing Screenshot...
                      </>
                    ) : (
                      <>
                        <Camera className="mr-2 h-4 w-4" />
                        Extract Health Metrics
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            {uploadResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {uploadResult.success ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Extraction Complete
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        Extraction Failed
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {uploadResult.success && uploadResult.metrics ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      <MetricCard 
                        label="Sleep Hours" 
                        value={uploadResult.metrics.sleepHours} 
                        unit="h" 
                      />
                      <MetricCard 
                        label="Recovery" 
                        value={uploadResult.metrics.recoveryPercent} 
                        unit="%" 
                      />
                      <MetricCard 
                        label="Strain" 
                        value={uploadResult.metrics.strain} 
                      />
                      <MetricCard 
                        label="HRV" 
                        value={uploadResult.metrics.hrv} 
                        unit="ms" 
                      />
                      <MetricCard 
                        label="Resting HR" 
                        value={uploadResult.metrics.restingHeartRate} 
                        unit=" bpm" 
                      />
                      <MetricCard 
                        label="Steps" 
                        value={uploadResult.metrics.steps} 
                      />
                      <MetricCard 
                        label="Calories" 
                        value={uploadResult.metrics.calories} 
                        unit=" cal" 
                      />
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Failed</h3>
                      <p className="text-gray-600">{uploadResult.error}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Tips Section */}
            <Card className="mt-8 bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">📱 Tips for Best Results</CardTitle>
              </CardHeader>
              <CardContent className="text-blue-800">
                <ul className="space-y-2 text-sm">
                  <li>• Ensure the screenshot is clear and readable</li>
                  <li>• Include the full screen with metric labels visible</li>
                  <li>• Use recent screenshots with current data</li>
                  <li>• Supported apps: Apple Health, Fitbit, Oura Ring, Whoop, Garmin Connect, and more</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
};

export default Snap;