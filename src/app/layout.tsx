import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import '../styles/globals.css';
import { DemoProvider } from '../context/DemoContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SonarGuard AI | AI-Powered Marine Debris & Anomaly Detection',
  description:
    'Naval-grade automated underwater marine debris and acoustic anomaly detection using side-scan sonar (SSS) imagery. Built for Smart India Hackathon 2025.',
  keywords: [
    'Smart India Hackathon 2025',
    'SonarGuard AI',
    'Marine Debris Detection',
    'Side-Scan Sonar',
    'YOLOv8 Sonar',
    'Ghost Net Removal',
    'UN SDG 14',
    'Indian Navy',
    'Ministry of Earth Sciences',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="bg-ocean-950 text-command-text min-h-screen flex flex-col antialiased selection:bg-sonar-cyan selection:text-ocean-950">
        <DemoProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </DemoProvider>
      </body>
    </html>
  );
}
