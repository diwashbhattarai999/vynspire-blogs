import { LogoutConfirmationDialog } from '@/components/shared/logout-confirmation-dialog';

import { Separator } from '../../ui/separator';
import { SidebarTrigger } from '../../ui/sidebar';
import { NotificationPopover } from './notification-popover';

// import { NotificationPopover } from './notification-popover';

interface SiteHeaderProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
}

export const SiteHeader = ({ title = 'Dashboard', children }: SiteHeaderProps) => (
  <header className='bg-background/50 sticky top-0 z-50 flex h-(--header-height) shrink-0 items-center gap-2 backdrop-blur-xl transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
    <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
      <SidebarTrigger className='-ml-1' title='Toggle Sidebar' />
      <Separator className='mx-2 data-[orientation=vertical]:h-5' orientation='vertical' />
      <h1 className='text-lg font-medium'>{title}</h1>

      <div className='ml-auto flex items-center gap-4'>
        <NotificationPopover />

        {children}

        <LogoutConfirmationDialog asChild />
      </div>
    </div>
  </header>
);
