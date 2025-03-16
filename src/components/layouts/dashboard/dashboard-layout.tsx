import { useAuth0 } from '@auth0/auth0-react';
import classnames from 'classnames';
import { BoxIcon, ChartBarIcon, CogIcon, HomeIcon, MenuIcon } from 'lucide-react';
import { Avatar } from 'radix-ui';
import { PropsWithChildren, useState } from 'react';

import { stringAvatar } from '@/utils/strings';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  current?: boolean;
}

export function DashboardLayout(props: PropsWithChildren) {
  const { user } = useAuth0();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Example navigation items - replace with your actual items
  const navigation: SidebarItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Orders', href: '/orders', icon: BoxIcon },
    { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
    { name: 'Settings', href: '/settings', icon: CogIcon },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div
        className={classnames(
          `fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto`,
          {
            'translate-x-0': sidebarOpen,
            '-translate-x-full': !sidebarOpen,
          },
        )}
      >
        <div
          className={
            'flex items-center justify-center px-4 bg-white border-b h-16 border-b-gray-300'
          }
        >
          <a href="/" className="">
            <span className="sr-only">99Minutos</span>
            <img className="h-8 w-auto" src="/logo.svg" alt="" />
          </a>
        </div>
        <nav className="h-full pt-5 px-2 space-y-1 bg-white border-r border-r-gray-300">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classnames(
                `group flex items-center px-2 py-2 text-base font-medium rounded-md`,
                {
                  'bg-gray-200 text-secondary hover:bg-secondary hover:text-white': true,
                },
              )}
            >
              <item.icon
                className={`
                mr-4 flex-shrink-0 h-6 w-6
                ${item.current ? 'text-white' : 'text-gray-400 group-hover:text-white'}
              `}
              />
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="g-white border-b h-16 border-b-gray-300">
          <nav className="h-full flex items-center justify-between px-4" aria-label="Global">
            <button
              type="button"
              className="lg:hidden -ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-x-12">
              <div className="hidden lg:flex lg:gap-x-12">{/* Portal custom actions */}</div>
            </div>
            <div className="flex">
              <Avatar.Root className="inline-flex items-center justify-center size-12 rounded-full border border-gray-200 bg-secondary text-white font-bold text-lg">
                <Avatar.Fallback>{stringAvatar(user?.name || '')}</Avatar.Fallback>
              </Avatar.Root>
            </div>
          </nav>
        </header>
        <main className="flex-1 p-4">{props.children}</main>
      </div>
    </div>
  );
}
