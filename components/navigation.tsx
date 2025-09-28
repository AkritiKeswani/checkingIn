import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between p-6 bg-white">
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold text-black">CheckingIn</span>
      </div>
      <div className="flex items-center space-x-8">
        <Link href="/" className="text-gray-600 hover:text-black">
          Features
        </Link>
        <Link href="/" className="text-gray-600 hover:text-black">
          How it Works
        </Link>
        <Link href="/" className="text-gray-600 hover:text-black">
          Sign In
        </Link>
        <Link href="/upload" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
          Get Started
        </Link>
      </div>
    </nav>
  )
}