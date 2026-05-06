'use client';

import type { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { TopBar } from './topbar';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
