'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@/shared/utils/cn';

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className
      )}
      {...props}
    />
  );
}

interface SeparatorTextProps extends React.ComponentProps<'span'> {
  text?: React.ReactNode;
  position?: 'left' | 'center' | 'right';
}

function SeparatorText({ className, text, position = 'center', ...props }: SeparatorTextProps) {
  // Create a map to help choose padding and justification
  const positionMap = {
    left: {
      justify: 'justify-start',
      sepOrder: [false, true],
      pad: ['pr-2', ''],
    },
    center: {
      justify: 'justify-center',
      sepOrder: [true, true],
      pad: ['px-2', ''],
    },
    right: {
      justify: 'justify-end',
      sepOrder: [true, false],
      pad: ['', 'pl-2'],
    },
  };

  const { justify, sepOrder, pad } = positionMap[position] || positionMap.center;

  return (
    <div className={cn('w-full max-w-sm', className)}>
      <div className={cn('relative flex items-center gap-2', justify)}>
        {sepOrder[0] && <Separator className="flex-1" />}
        <span
          {...props}
          className={cn(
            'text-muted-foreground shrink-0 text-xs',
            position === 'center' ? 'uppercase' : '',
            pad[0] || pad[1]
          )}
        >
          {text}
        </span>
        {sepOrder[1] && <Separator className="flex-1" />}
      </div>
    </div>
  );
}

export { Separator, SeparatorText };
