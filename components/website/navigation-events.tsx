'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.start();
    NProgress.set(1);

    const timer = setTimeout(() => {
      NProgress.remove();
    }, 10);

    return () => {
      clearTimeout(timer);
      NProgress.remove();
    };
  }, [pathname, searchParams]);

  return null;
}
