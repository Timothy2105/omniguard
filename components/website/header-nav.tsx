import Link from 'next/link';
import { Video, PlaySquare, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeaderNav() {
  return (
    <div className="flex items-center gap-2">
      <Button asChild variant="ghost" size="sm">
        <Link href="/upload" className="flex items-center gap-2">
          <Video className="h-4 w-4" />
          <span>Upload</span>
        </Link>
      </Button>
      <Button asChild variant="ghost" size="sm">
        <Link href="/realtime-stream" className="flex items-center gap-2">
          <PlaySquare className="h-4 w-4" />
          <span>Realtime</span>
        </Link>
      </Button>
      <Button asChild variant="ghost" size="sm">
        <Link href="/saved-videos" className="flex items-center gap-2">
          <FolderOpen className="h-4 w-4" />
          <span>Library</span>
        </Link>
      </Button>
    </div>
  );
}
