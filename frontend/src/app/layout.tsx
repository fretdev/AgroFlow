import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgroFlow | Smart Agricultural Supply Chain & Marketplace",
  description: "Connect directly with farmers, buyers, and transporters on AgroFlow. Streamline agricultural trade and eliminate post-harvest crop spoilage with our intelligent supply chain platform.",
};

export default function RootLayout({
                      children,
                    }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
          lang="en"
          className={`${jakarta.variable} h-full antialiased`}
      >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
      {children}
      </body>
      </html>
  );
}