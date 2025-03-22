import UploadButton from '@/components/website/upload-button';

export default function Upload() {
  return (
    <main className="flex flex-col items-center justify-center bg-black p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Upload a video to analyze!</h1>
        <div className="flex justify-center">
          <UploadButton />
        </div>
      </div>
    </main>
  );
}
