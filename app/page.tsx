import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">CheckingIn</h1>
        <p className="text-gray-600 mb-8">AI wellness coach that analyzes health screenshots</p>
        
        <div className="space-y-4">
          <div>
            <Link href="/upload" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
              Upload Health Screenshot
            </Link>
          </div>
          <div>
            <Link href="/analysis" className="text-blue-500 hover:underline">
              View Analysis
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-6">How it works:</h2>
        <div className="space-y-4">
          <div className="border p-4 rounded">
            <h3 className="font-medium">1. Upload Screenshot</h3>
            <p className="text-gray-600">Upload a screenshot from your health app</p>
          </div>
          <div className="border p-4 rounded">
            <h3 className="font-medium">2. AI Analysis</h3>
            <p className="text-gray-600">AI extracts health metrics from your image</p>
          </div>
          <div className="border p-4 rounded">
            <h3 className="font-medium">3. Get Guidance</h3>
            <p className="text-gray-600">Receive personalized wellness recommendations</p>
          </div>
        </div>
      </div>
    </div>
  );
}