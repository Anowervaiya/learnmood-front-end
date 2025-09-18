import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/modules/shared/Navbar';

import { Toaster } from '@/components/ui/sonner';
import { ReduxProvider } from '@/redux/provider/provider';

export const metadata: Metadata = {
  title: 'Learnmood',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {/* <Toaster richColors/> */}
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
