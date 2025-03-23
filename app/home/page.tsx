import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-black flex items-center justify-center">
      <div className="space-y-4 w-full max-w-md px-4">
        <h1 className="text-white text-3xl font-bold text-center mb-8">Video Options</h1>
        <Link href="upload" className="block w-full">
          <button className="w-full bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-300">
            Analyze Video
          </button>
        </Link>
        <Link href="realtimeStream" className="block w-full">
          <button className="w-full bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-300">
            Realtime Streaming
          </button>
        </Link>
        <Link href="searchHistory" className="block w-full">
          <button className="w-full bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-300">
            Search Previous Videos
          </button>
        </Link>
      </div>
    </div>
  );
}
