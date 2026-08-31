import { Metadata } from "next"
import { Inter, Fraunces, Merriweather_Sans } from "next/font/google"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { SessionProviderWrapper } from "@/providers/SessionProviderWrapper"
import { AuthSessionProvider } from "@/providers/AuthSessionProvider"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import AgeConsent from "@/components/AgeConsent/AgeConsent"
import StoreInitializer from "@/components/Store/StoreInitializer"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import "./variables.css"
import "./globals.css"

const inter = Inter({ subsets: ['latin'] })

const fraunces = Fraunces({ 
  subsets: ['latin'], 
  variable: '--font-fraunces',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] 
})

const merriweatherSans = Merriweather_Sans({ 
  subsets: ['latin'], 
  variable: '--font-merriweather-sans',
  weight: ['300', '400', '500', '600', '700', '800'] 
})

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: `${process.env.NEXT_PUBLIC_SITENAME}`,
    template: `%s | ${process.env.NEXT_PUBLIC_SITENAME}`,
  },
  description: `Explore the world of ${process.env.NEXT_PUBLIC_SITENAME}, where you can discover honest opinions and immersive storytelling from our community of reviewers. Join us for a unique experience that tantalizes your taste buds.`,
  openGraph: {
    type: "website",
    siteName: `${process.env.NEXT_PUBLIC_SITENAME}`,
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${merriweatherSans.variable}`}>
      <body className={cn(styles.body, inter.className)}>
        <StoreInitializer />
        <Toaster 
          position="top-center" 
          expand={true} 
          richColors 
          closeButton={true}
          style={{background: "var(--toastBackground)"}} 
        />
        {/* <SessionProviderWrapper> */}
          <AuthSessionProvider>
            <TooltipProvider>
              <Header />
              <main className='flex-auto w-full min-h-screen'>
                {children}
              </main>
            </TooltipProvider>
          </AuthSessionProvider>
        {/* </SessionProviderWrapper> */}
        <Footer />
        <AgeConsent />
      </body>
    </html>
  );
}
