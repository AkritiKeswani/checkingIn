import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Manrope } from 'next/font/google'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${manrope.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
