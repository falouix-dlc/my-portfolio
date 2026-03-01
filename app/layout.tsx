// app/layout.tsx
import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ThemeProvider } from './components/ThemeProvider'

// Modern font combination: Inter for UI, JetBrains Mono for code/accents
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'Fakhreddine | Full Stack Developer',
    template: '%s | Fakhreddine'
  },
  description: 'Full Stack Developer with 5+ years experience building scalable web applications using Laravel, React, Node.js, and Django. Based in Italy, open to international opportunities.',
  keywords: ['Full Stack Developer', 'Laravel', 'React', 'Node.js', 'Django', 'Web Developer', 'Italy'],
  authors: [{ name: 'Fakhreddine' }],
  creator: 'Fakhreddine',
  metadataBase: new URL('https://falouix.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://falouix.com',
    title: 'Fakhreddine | Full Stack Developer',
    description: 'Building scalable digital systems with modern technologies.',
    siteName: 'Fakhreddine Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fakhreddine - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fakhreddine | Full Stack Developer',
    description: 'Building scalable digital systems with modern technologies.',
    images: ['/og-image.jpg'],
    creator: '@falouix',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.classList.add(theme);
              })();
            `,
          }}
        />
      </head>
      <body 
        className="font-sans antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300"
      >
        <ThemeProvider>
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}