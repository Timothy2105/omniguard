'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

const ProgressBar = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root ref={ref} className="relative h-2 w-full overflow-hidden rounded-full bg-zinc-800" {...props}>
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-purple-600 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
ProgressBar.displayName = ProgressPrimitive.Root.displayName;

export { ProgressBar };
