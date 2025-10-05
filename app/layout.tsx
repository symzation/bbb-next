import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { SessionProviderWrapper } from "@/providers/SessionProviderWrapper"
import { AuthProvider } from "@/providers/AuthProvider"
import { LoginProvider} from "@/providers/LoginProvider"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import AgeConsent from "@/components/AgeConsent/AgeConsent"
import "./globals.css"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bourbon Brew & Bites',
  description: 'Explore the world of Bourbon Brew & Bites, where we blend the finest bourbons with delicious bites. Join us for a unique culinary experience that tantalizes your taste buds.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(styles.body, inter.className)}>
        <SessionProviderWrapper>
          <AuthProvider>
            <LoginProvider>
              <Header />
              <main className='flex-auto w-full min-h-screen pb-5'>
                {children}
              </main>
            </LoginProvider>
          </AuthProvider>
        </SessionProviderWrapper>
        <Footer />
        <AgeConsent />
      </body>
    </html>
  );
}
