import { Dialog, DialogContent, DialogTitle } from '@/components/website/dialog';
import { VisuallyHidden } from '@/components/website/visually-hidden';
import { Battery, Signal, AlertTriangle } from 'lucide-react';
import { locations } from '@/lib/data';
import { useEffect, useRef } from 'react';

interface CameraModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cameraId: string;
  incident?: string;
  date: Date;
  currentTime?: number;
}

export function CameraModal({ open, onOpenChange, cameraId, incident, date, currentTime = 0 }: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const camera = locations.flatMap((location) => location.cameras).find((cam) => cam.id === cameraId);

  useEffect(() => {
    if (open && videoRef.current && currentTime > 0) {
      videoRef.current.currentTime = currentTime;
    }
  }, [open, currentTime]);

  if (!camera) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl bg-black p-0">
        <VisuallyHidden>
          <DialogTitle>Camera Feed: {camera.name}</DialogTitle>
        </VisuallyHidden>
        <div className="relative aspect-[4/3]">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              transform: `scale(${
                [
                  'Shoplifting2',
                  'Shoplifting3',
                  'Fighting0',
                  'Fighting3',
                  'Stealing0',
                  'Stealing3',
                  'Vandalism0',
                  'Vandalism1',
                ].includes(camera.name)
                  ? '1.15'
                  : '1.0'
              })`,
            }}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={camera.videoUrl} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjEiLz48L3N2Zz4=')] opacity-50" />

          <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/50 to-transparent p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 font-mono text-green-500">
                <Signal className="h-5 w-5" />
                <Battery className="h-5 w-5" />
              </div>

              {incident && (
                <div className="flex items-center gap-2 rounded-lg bg-red-500/20 px-4 py-2 font-mono text-sm text-red-500 backdrop-blur-sm">
                  <AlertTriangle className="h-5 w-5" />
                  <span>INCIDENT DETECTED</span>
                </div>
              )}
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-6">
            <div className="space-y-1 font-mono text-green-500/90">
              <div className="text-xl font-bold">{camera.name}</div>
              <div className="text-sm opacity-80">{camera.address}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
