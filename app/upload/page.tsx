'use client'

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface HealthMetrics {
  sleepHours?: number;
  recoveryPercent?: number;
  strain?: number;
  hrv?: number;
  restingHeartRate?: number;
  steps?: number;
  calories?: number;
}

export default function UploadPage() {
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

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Upload Health Screenshot</h1>
      
      <div className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 ${
        isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
      }`}
           onDrop={handleDrop}
           onDragOver={handleDragOver}
           onDragLeave={handleDragLeave}>
        
        {previewUrl ? (
          <div className="mb-4">
            <img src={previewUrl} alt="Preview" className="max-w-full h-48 object-cover mx-auto rounded" />
          </div>
        ) : (
          <div className="mb-4">
            <p className="text-gray-600">Drag and drop your health screenshot here, or click to browse</p>
          </div>
        )}
        
        <input
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
          id="file-input"
        />
        <label htmlFor="file-input" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
          Choose File
        </label>
      </div>

      {selectedFile && (
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">Selected: {selectedFile.name}</p>
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            {isUploading ? 'Analyzing...' : 'Upload & Analyze'}
          </button>
        </div>
      )}

      {uploadResult && (
        <div className="border rounded p-4">
          {uploadResult.success ? (
            <div>
              <h3 className="text-green-600 font-semibold mb-4">Analysis Complete!</h3>
              {uploadResult.metrics && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {uploadResult.metrics.sleepHours && (
                    <div className="border p-3 rounded">
                      <div className="text-sm text-gray-600">Sleep Hours</div>
                      <div className="font-bold">{uploadResult.metrics.sleepHours}h</div>
                    </div>
                  )}
                  {uploadResult.metrics.recoveryPercent && (
                    <div className="border p-3 rounded">
                      <div className="text-sm text-gray-600">Recovery</div>
                      <div className="font-bold">{uploadResult.metrics.recoveryPercent}%</div>
                    </div>
                  )}
                  {uploadResult.metrics.steps && (
                    <div className="border p-3 rounded">
                      <div className="text-sm text-gray-600">Steps</div>
                      <div className="font-bold">{uploadResult.metrics.steps.toLocaleString()}</div>
                    </div>
                  )}
                  {uploadResult.metrics.calories && (
                    <div className="border p-3 rounded">
                      <div className="text-sm text-gray-600">Calories</div>
                      <div className="font-bold">{uploadResult.metrics.calories}</div>
                    </div>
                  )}
                </div>
              )}
              <button
                onClick={handleViewAnalysis}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Full Analysis
              </button>
            </div>
          ) : (
            <div className="text-red-600">
              <h3 className="font-semibold mb-2">Upload Failed</h3>
              <p className="text-sm">{uploadResult.error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}