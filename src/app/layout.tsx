import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'AI Video Caption Generator',
  description: 'AI-powered video captioner tool',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scrollbar-hide">
        <body className={`antialiased`}>
          <Toaster />
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
