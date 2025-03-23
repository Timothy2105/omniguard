import Link from 'next/link';
import ParticleBackground from '@/components/website/particle-background';
import AnimatedText from '@/components/website/animated-text';
import ClientProvider from '@/components/providers/client-provider';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient"></div>
      <ClientProvider>
        <ParticleBackground />
        <div className="z-10 text-center space-y-4">
          <h1 className="text-6xl font-bold mb-2 text-white glow-text">OmniGuard</h1>
          <AnimatedText />
          <Link
            href="/sign-in"
            className="inline-block px-8 py-3 mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-xl font-semibold transition-all duration-300 ease-in-out hover:from-purple-500 hover:to-blue-500 hover:translate-y-[-4px] hover:shadow-lg hover:shadow-purple-500/25"
          >
            Get Started
          </Link>
        </div>
      </ClientProvider>
    </main>
  );
}
