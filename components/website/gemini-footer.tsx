import Image from 'next/image';

export function GeminiFooter() {
  return (
    <div className="flex items-center gap-2">
      <p>
        Powered by{' '}
        <Image
          src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg"
          alt="Gemini Logo"
          width={20}
          height={20}
          className="inline-block"
        />
        <a href="https://gemini.google.com/app" target="_blank" className="font-bold hover:underline" rel="noreferrer">
          Gemini
        </a>
      </p>
    </div>
  );
}
