// 'use client';

// import { Button } from '@/components/ui/button';
// import { Clock } from 'lucide-react';
// import type { Timestamp } from '@/app/types';
// import { useState } from 'react';

// interface TimestampItemProps {
//   timestamp: string;
//   description: string;
//   onClick: () => void;
// }

// function TimestampItem({ timestamp, description, onClick }: TimestampItemProps) {
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <Button
//       variant="outline"
//       className="w-full justify-start gap-2 h-auto py-4 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-left"
//       onClick={() => {
//         setIsExpanded(!isExpanded);
//         onClick();
//       }}
//     >
//       <Clock className="h-4 w-4 shrink-0 text-purple-400" />
//       <div className="flex flex-col items-start w-full">
//         <span className="font-mono text-white">{timestamp}</span>
//         <span
//           className={`text-sm text-zinc-400 max-w-[50vw] ${
//             isExpanded ? 'whitespace-pre-wrap break-words' : 'overflow-hidden text-ellipsis whitespace-nowrap'
//           }`}
//         >
//           {description}
//         </span>
//       </div>
//     </Button>
//   );
// }

// interface TimestampListProps {
//   timestamps: Timestamp[];
//   onTimestampClick: (timestamp: string) => void;
//   showHeading?: boolean;
// }

// export default function TimestampList({ timestamps, onTimestampClick, showHeading = true }: TimestampListProps) {
//   return (
//     <div className="grid gap-2">
//       {showHeading && <h2 className="text-xl font-semibold mb-2 text-white">Key Moments</h2>}
//       <div className="grid gap-2">
//         {timestamps.map((item, index) => (
//           <TimestampItem
//             key={index}
//             timestamp={item.timestamp}
//             description={item.description}
//             onClick={() => onTimestampClick(item.timestamp)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

'use client';

import { Button } from '@/components/ui/button';
import { Clock, AlertTriangle, Shield, ShieldAlert } from 'lucide-react';
import type { Timestamp } from '@/app/types';
import { useState } from 'react';

interface TimestampItemProps {
  timestamp: string;
  description: string;
  isDangerous?: boolean;
  onClick: () => void;
}

function TimestampItem({ timestamp, description, isDangerous, onClick }: TimestampItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Button
      variant="outline"
      className={`group w-full justify-start gap-2 h-auto py-4 transition-all duration-200 ${
        isDangerous
          ? 'bg-red-950/20 border-red-900/50 hover:bg-red-950/30 hover:border-red-700/70'
          : 'bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800 hover:border-zinc-600'
      } text-left relative overflow-hidden`}
      onClick={() => {
        setIsExpanded(!isExpanded);
        onClick();
      }}
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-200 ${
          isDangerous ? 'bg-red-500 group-hover:bg-red-400' : 'bg-green-500 group-hover:bg-green-400'
        }`}
      />
      {isDangerous ? (
        <ShieldAlert className="h-4 w-4 shrink-0 text-red-400" />
      ) : (
        <Shield className="h-4 w-4 shrink-0 text-green-400" />
      )}
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-2">
          <span className="font-mono text-white">{timestamp}</span>
          {isDangerous && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
              Dangerous
            </span>
          )}
        </div>
        <span
          className={`text-sm mt-0.5 ${isDangerous ? 'text-red-200/80' : 'text-zinc-400'} max-w-[50vw] ${
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
      {showHeading && (
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-white">Key Moments</h2>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-zinc-400">Safe</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-red-400" />
              <span className="text-zinc-400">Dangerous</span>
            </div>
          </div>
        </div>
      )}
      <div className="grid gap-2">
        {timestamps.map((item, index) => (
          <TimestampItem
            key={index}
            timestamp={item.timestamp}
            description={item.description}
            isDangerous={item.isDangerous}
            onClick={() => onTimestampClick(item.timestamp)}
          />
        ))}
      </div>
    </div>
  );
}
