import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { Toaster } from "sonner";
import { WorkoutProvider } from "@/context/WorkoutContext";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FitLog — Train With Intent. Log Every Set.",
  description: "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
  icons: {
    icon: "/assets/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} dark antialiased`}>
      <body className="min-h-screen flex flex-col bg-[#090a0f] text-gray-100 font-sans selection:bg-[#ccff00] selection:text-black">
        <WorkoutProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
        </WorkoutProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#171b24",
              color: "#f3f4f6",
              border: "1px solid #283042",
            },
            className: "text-sm font-medium",
          }}
          richColors
        />
      </body>
    </html>
  );
}
