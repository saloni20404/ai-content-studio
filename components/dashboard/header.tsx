'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun, LogOut, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useClerk, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export function Header() {
  const { theme, setTheme } = useTheme();
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();

  const initials = user?.firstName
    ? `${user.firstName[0]}${user.lastName?.[0] || ''}`
    : 'U';

  return (
    <header className="border-b border-secondary bg-card/50 sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="border-secondary text-foreground hover:bg-secondary"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-secondary text-foreground hover:bg-secondary rounded-full w-10 h-10 p-0"
              >
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent font-semibold">{initials}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="flex items-center gap-2 py-2">
                <User className="w-4 h-4" />
                <span>{user?.emailAddresses[0]?.emailAddress || 'Profile'}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center gap-2 py-2 text-red-500 cursor-pointer"
                onClick={() => signOut(() => router.push('/'))}
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
