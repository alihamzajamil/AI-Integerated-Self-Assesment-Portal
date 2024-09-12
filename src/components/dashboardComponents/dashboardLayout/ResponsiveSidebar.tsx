'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, Package, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';


function ResponsiveSidebar() {

  const path = usePathname();
 
  const menuItems = [
    { name: "Dashboard", icon: Home, href: "/dashboard", badge: null },
    { name: "Profile", icon: ShoppingCart, href: "/dashboard/profile", badge: null },
    { name: "Quiz", icon: Package, href: "/dashboard/quiz", badge: 0 },
    
  ];

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <User className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {menuItems.map((item) => {
              const isActive = path === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${
                    isActive ? "bg-black text-white" : "text-muted-foreground hover:text-white hover:bg-black"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                  {item.badge && (
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      {item? item.badge : null}

                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default ResponsiveSidebar;
