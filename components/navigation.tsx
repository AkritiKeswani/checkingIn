import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Activity, Camera, Heart, TrendingUp } from 'lucide-react'

export default function Navigation() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Activity className="h-6 w-6" />
            <span className="font-bold">CheckingIn</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link href="/snap">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Snap
              </Button>
            </Link>
            <Link href="/checkin">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Check-in
              </Button>
            </Link>
            <Link href="/insights">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Insights
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  )
}