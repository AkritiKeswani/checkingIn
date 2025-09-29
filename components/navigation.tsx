import Link from 'next/link'

function HeartLogo() {
  return (
    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
      <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M17.367 1.634a4.5 4.5 0 0 0-6.364 0L10 2.637l-1.003-1.003a4.5 4.5 0 1 0-6.364 6.364L10 15.364l7.367-7.366a4.5 4.5 0 0 0 0-6.364z" 
          stroke="white" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  )
}

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between p-6 bg-white">
      <div className="flex items-center space-x-3">
        <HeartLogo />
        <span className="text-xl font-bold text-black">CheckingIn</span>
      </div>
      <div className="flex items-center space-x-8">
        <Link href="/" className="text-gray-600 hover:text-black">
          Dashboard
        </Link>
        <Link href="/upload" className="text-gray-600 hover:text-black">
          Upload Health Data
        </Link>
        <Link href="/journal" className="text-gray-600 hover:text-black">
          Journal
        </Link>
        <div className="flex items-center space-x-3">
          <span className="text-gray-600">Hi, Demo User!</span>
          <span className="text-gray-600 hover:text-black cursor-pointer">
            Sign Out
          </span>
        </div>
      </div>
    </nav>
  )
}