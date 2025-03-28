import DeployButton from '@/components/deploy-button';
import { EnvVarWarning } from '@/components/env-var-warning';
import HeaderAuth from '@/components/header-auth';
import { hasEnvVars } from '@/utils/supabase/check-env-vars';
import { Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Link from 'next/link';
import DynamicHomeLink from '@/components/website/dynamic-home-link';
import { HeaderNav } from '@/components/website/header-nav';
import { GeminiFooter } from '@/components/website/gemini-footer';
import './globals.css';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 1,
  minimum: 0.99,
  easing: 'ease',
  speed: 1,
});

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'OmniGuard',
  description: 'Real-time workplace safety monitoring and analysis',
};

const geistSans = Geist({
  display: 'swap',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex items-center gap-8">
                    <DynamicHomeLink />
                    <HeaderNav />
                  </div>
                  <HeaderAuth />
                </div>
              </nav>
              <div className="w-full">{children}</div>
              <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center">
                <GeminiFooter />
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
