'use client';

import { useEffect, useState } from 'react';

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // loading state
  if (!mounted) {
    return <div className="min-h-screen flex flex-col items-center justify-center"></div>;
  }

  return <>{children}</>;
}
