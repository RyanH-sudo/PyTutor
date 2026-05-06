'use client';

import { Briefcase } from 'lucide-react';
import type { ReactNode } from 'react';

export interface FDEConnectionProps {
  children: ReactNode;
}

/**
 * "Connection to FDE work" — links a Python concept to how you'd actually
 * use it as a Forward Deployed Engineer or Applied AI Engineer. These
 * cards make the curriculum concrete: not "this is a feature" but
 * "this is how you'll use it next month at your new job."
 */
export function FDEConnection({ children }: FDEConnectionProps) {
  return (
    <aside className="my-6 rounded-lg border border-primary/30 bg-primary/5 p-4">
      <div className="flex items-start gap-3">
        <div className="rounded-md bg-primary/15 p-1.5 mt-0.5">
          <Briefcase className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-mono uppercase tracking-wider text-primary/80 mb-1.5">
            Connection to FDE work
          </div>
          <div className="font-serif text-[1.05rem] leading-relaxed text-foreground/90">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}
