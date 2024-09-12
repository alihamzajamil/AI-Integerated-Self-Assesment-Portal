'use client';
import { Button } from '@/components/ui/button'
import { useUser } from '@/store/useUserStore';
import { Bell, Package2, User } from 'lucide-react';
import Link from 'next/link';

function SidebarHeader() {
  const { user } = useUser();

  return (
    <div>
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <User className="h-6 w-6" /> {/* User icon added */}
          <span className="">{user?.fullName}</span>
        </Link>
        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </div>
    </div>
  )
}

export default SidebarHeader;
