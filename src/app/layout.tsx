import type { Metadata } from 'next';
import './globals.css';

import { Toaster } from '@/components/ui/sonner';
import { ReduxProvider } from '@/redux/provider/provider';
import LoginSuccessToast from '@/components/shared/LoginSuccessToast';
import LogoutSuccessToast from '@/components/shared/LogoutSuccessToast';

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
          {children}
        <Toaster richColors />
         <LoginSuccessToast />
        <LogoutSuccessToast />
        </ReduxProvider>
      </body>
    </html>
  );
}
