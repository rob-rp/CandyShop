import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Goodie Bag",
  description: "Candy App",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey= {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <nav className="bg-pink-300 p-4 text-white flex justify-between items-center">
            <h2 className="text-xl font-bold">Goodie Bag</h2>
            <div className="space-x-4">
              <Link href="/">Home Page</Link>
              <Link href="/candies">All Candies</Link>
            </div>
            <div className="flex justify-end items-center p-4 gap-4 h-16">
                <SignedOut>
                  <SignInButton />
                  <SignUpButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
          </nav>
          <main className="p-6">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
