import Link from 'next/link';
import { Video, PlaySquare, FolderOpen, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="relative bg-zinc-900 rounded-2xl p-8 shadow-xl">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-white tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
            Video Options
          </h1>
          <div className="space-y-4">
            <Link href="/dashboard" className="block w-full">
              <button className="w-full bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center">
                <Shield className="mr-2 h-5 w-5" />
                Security Dashboard
              </button>
            </Link>
            <Link href="/upload" className="block w-full">
              <button className="w-full bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center">
                <Video className="mr-2 h-5 w-5" />
                Analyze Video
              </button>
            </Link>
            <Link href="/realtime-stream" className="block w-full">
              <button className="w-full bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center">
                <PlaySquare className="mr-2 h-5 w-5" />
                Real-Time Stream Analysis
              </button>
            </Link>
            <Link href="/saved-videos" className="block w-full">
              <button className="w-full bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center">
                <FolderOpen className="mr-2 h-5 w-5" />
                View Saved Videos
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
