import { useAuth0 } from '@auth0/auth0-react';
import { DropdownMenu } from '@radix-ui/themes';
import classnames from 'classnames';
import { ChevronsLeftIcon, ChevronsRightIcon, HomeIcon } from 'lucide-react';
import { Avatar } from 'radix-ui';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';

import { stringAvatar } from '@/utils/strings';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  current?: boolean;
}

export function DashboardLayout(props: PropsWithChildren) {
  const { user, logout } = useAuth0();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation: SidebarItem[] = [{ name: 'Inicio', href: '/', icon: HomeIcon }];

  const onToggleSidebar = useCallback(() => {
    setSidebarOpen(!sidebarOpen);
    localStorage.setItem('sidebarOpen', JSON.stringify(!sidebarOpen));
  }, [sidebarOpen]);

  useEffect(() => {
    const storedState = localStorage.getItem('sidebarOpen');
    setSidebarOpen(JSON.parse(storedState || 'true'));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile sidebar overlay */}

      <header className="w-full g-white border-b h-16 border-b-secondaryborder-secondary">
        <div className="h-full flex items-center justify-between px-4" aria-label="Global">
          <div className="flex items-center">
            <div className={'flex-shrink-0 inline-flex items-center justify-center'}>
              <a href="/" className="">
                <span className="sr-only">99Minutos</span>
                <img className="h-8 w-auto" src="/logo.svg" alt="" />
              </a>
            </div>
          </div>
          <div className="flex items-center gap-x-12" id="portal-actions">
            {/* Portal custom actions */}
          </div>
          <div className="flex items-center gap-3">
            <span className="select-none">{user?.name || ''}</span>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="cursor-pointer">
                <Avatar.Root className="inline-flex items-center justify-center size-12 rounded-full border border-gray-200 bg-secondary text-white font-bold text-lg">
                  <Avatar.Fallback>{stringAvatar(user?.name || '')}</Avatar.Fallback>
                </Avatar.Root>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  Cerrar sesión
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </div>
      </header>
      <div className="flex flex-grow">
        <div
          className={classnames(
            `fixed h-full left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out`,
            {
              'translate-x-0': sidebarOpen,
              '-translate-x-full': !sidebarOpen,
            },
          )}
        >
          <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto px-2 space-y-1 bg-white border-r border-r-secondaryborder-secondary">
              <nav className="space-y-1 relative">
                <div className="text-right py-2">
                  <button
                    className="p-1 cursor-pointer text-secondary hover:bg-secondary hover:text-white rounded-md"
                    onClick={onToggleSidebar}
                    aria-label={sidebarOpen ? 'Cerrar menú lateral' : 'Abrir menú lateral'}
                  >
                    <ChevronsLeftIcon className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
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
          </div>
        </div>
        <main
          className={classnames('relative flex-1 transition-all duration-300', {
            'ml-0': !sidebarOpen,
            'ml-64': sidebarOpen,
          })}
        >
          <button
            className={classnames(
              'z-10 bg-secondary text-white absolute left-1 top-2 py-1 px-1 h-auto w-auto border rounded-md border-secondary transform transition-transform duration-300 ease-in-out',
              {
                hidden: sidebarOpen,
              },
            )}
            onClick={onToggleSidebar}
          >
            <ChevronsRightIcon className="h-4 w-4" aria-hidden="true" />
          </button>
          {props.children}
        </main>
      </div>
    </div>
  );
}
