'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function DynamicHomeLink() {
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      router.push('/home');
    } else {
      router.push('/');
    }
  };

  return (
    <Link href="/" onClick={handleClick} className="font-semibold flex items-center">
      <Image src="/logo.png" alt="OmniGuard Logo" width={200} height={40} className="object-contain" priority />
    </Link>
  );
}
