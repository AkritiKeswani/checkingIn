import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="border-b border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          CheckingIn
        </Link>
        <div className="flex space-x-6">
          <Link href="/upload" className="text-gray-600 hover:text-blue-600">
            Upload
          </Link>
          <Link href="/analysis" className="text-gray-600 hover:text-blue-600">
            Analysis
          </Link>
          <Link href="/guidance" className="text-gray-600 hover:text-blue-600">
            Guidance
          </Link>
          <Link href="/journal" className="text-gray-600 hover:text-blue-600">
            Journal
          </Link>
        </div>
      </div>
    </nav>
  )
}