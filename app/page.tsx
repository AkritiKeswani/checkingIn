import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-black mb-6 leading-tight">
            Your Complete Wellness Journey Starts Here
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            A holistic daily wellness tracker that combines physical biometrics with mental health check-ins to give you complete insights into your wellbeing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/upload" className="bg-black text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors">
              Upload Health Screenshot
            </Link>
            <Link href="/analysis" className="border border-black text-black px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors">
              Mental Health Check-in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}