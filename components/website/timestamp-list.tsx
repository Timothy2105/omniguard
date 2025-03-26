'use client';

import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import type { Timestamp } from '@/app/types';
import { useState } from 'react';

interface TimestampItemProps {
  timestamp: string;
  description: string;
  onClick: () => void;
}

function TimestampItem({ timestamp, description, onClick }: TimestampItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Button
      variant="outline"
      className="w-full justify-start gap-2 h-auto py-4 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-left"
      onClick={() => {
        setIsExpanded(!isExpanded);
        onClick();
      }}
    >
      <Clock className="h-4 w-4 shrink-0 text-purple-400" />
      <div className="flex flex-col items-start w-full">
        <span className="font-mono text-white">{timestamp}</span>
        <span
          className={`text-sm text-zinc-400 max-w-[50vw] ${
            isExpanded ? 'whitespace-pre-wrap break-words' : 'overflow-hidden text-ellipsis whitespace-nowrap'
          }`}
        >
          {description}
        </span>
      </div>
    </Button>
  );
}

interface TimestampListProps {
  timestamps: Timestamp[];
  onTimestampClick: (timestamp: string) => void;
  showHeading?: boolean;
}

export default function TimestampList({ timestamps, onTimestampClick, showHeading = true }: TimestampListProps) {
  return (
    <div className="grid gap-2">
      {showHeading && <h2 className="text-xl font-semibold mb-2 text-white">Key Moments</h2>}
      <div className="grid gap-2">
        {timestamps.map((item, index) => (
          <TimestampItem
            key={index}
            timestamp={item.timestamp}
            description={item.description}
            onClick={() => onTimestampClick(item.timestamp)}
          />
        ))}
      </div>
    </div>
  );
}
