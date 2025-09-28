import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Manrope } from 'next/font/google'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${manrope.variable} font-sans antialiased`}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
