import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/css/globals.css";
import { ThemeProvider } from 'next-themes'
import { ReduxPovider } from "@/redux/ReduxProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sharehub",
  description: "A sharehub nextjs app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxPovider>
          <ThemeProvider attribute="class">
            {children}
          </ThemeProvider>   
        </ReduxPovider>
        <Toaster/>
      </body>
    </html>
  );
}
