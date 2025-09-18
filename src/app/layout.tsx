import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: 'Learnmood'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      
      </head>
      <body suppressHydrationWarning>
        
        {children}
      
      </body>
    </html>
  );
}
