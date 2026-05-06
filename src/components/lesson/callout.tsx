'use client';

import { AlertCircle, Info, Lightbulb, AlertTriangle } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type CalloutKind = 'info' | 'tip' | 'warning' | 'gotcha';

export interface CalloutProps {
  kind?: CalloutKind;
  title?: string;
  children: ReactNode;
}

const config: Record<
  CalloutKind,
  { icon: typeof Info; color: string; label: string }
> = {
  info: { icon: Info, color: 'border-primary/30 bg-primary/5', label: 'Note' },
  tip: {
    icon: Lightbulb,
    color: 'border-success/30 bg-success/5',
    label: 'Tip',
  },
  warning: {
    icon: AlertTriangle,
    color: 'border-warning/30 bg-warning/5',
    label: 'Watch out',
  },
  gotcha: {
    icon: AlertCircle,
    color: 'border-destructive/30 bg-destructive/5',
    label: 'Gotcha',
  },
};

export function Callout({ kind = 'info', title, children }: CalloutProps) {
  const c = config[kind];
  const Icon = c.icon;
  return (
    <aside className={cn('my-6 rounded-lg border p-4', c.color)}>
      <div className="flex items-start gap-3">
        <Icon className="h-4 w-4 mt-1 shrink-0" />
        <div className="flex-1">
          <div className="text-xs font-mono uppercase tracking-wider mb-1.5 opacity-80">
            {title ?? c.label}
          </div>
          <div className="font-serif text-[1.05rem] leading-relaxed text-foreground/90">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}
