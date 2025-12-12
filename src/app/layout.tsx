import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { ReduxProvider } from "@/redux/provider/provider";
import LoginSuccessToast from "@/components/shared/LoginSuccessToast";
import LogoutSuccessToast from "@/components/shared/LogoutSuccessToast";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Learnmood",
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
         <Suspense fallback={null}>
           <LoginSuccessToast />
          <LogoutSuccessToast />
         </Suspense>
        </ReduxProvider>
      </body>
    </html>
  );
}
