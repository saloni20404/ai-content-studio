'use client';

import { FileText, Folder, Settings, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { icon: FileText, label: 'My Content', href: '/dashboard' },
  { icon: Folder, label: 'Folders', href: '/dashboard/folders' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  { icon: BarChart3, label: 'Usage', href: '/dashboard/usage' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-secondary bg-card/50 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-secondary">
        <Link href="/" className="text-2xl font-bold text-foreground">
          Content<span className="text-accent">Pro</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <button
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                  isActive
                    ? 'bg-accent/20 text-accent'
                    : 'text-foreground hover:bg-secondary/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            </Link>
          );
        })}
      </nav>

      {/* Upgrade prompt */}
      <div className="p-4 border-t border-secondary">
        <div className="bg-secondary/30 rounded-lg p-4 text-center">
          <p className="text-sm text-foreground mb-3">Ready to unlock more?</p>
          <button className="w-full px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </aside>
  );
}
