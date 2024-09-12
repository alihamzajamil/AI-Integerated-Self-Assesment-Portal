"use client";
import { Badge } from "@/components/ui/badge";
import { Package, ShoppingCart, LogOut, ForwardIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

function DesktopSidebar() {
  const path = usePathname();
  const { logout } = useUserStore(); // Assuming you have a logout function in useUserStore
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const menuItems = [
    // { name: "Dashboard", icon: Home, href: "/dashboard", badge: null },
    { name: "Profile", icon: ShoppingCart, href: "/dashboard/profile", badge: null },
    { name: "Quiz", icon: Package, href: "/dashboard/quiz", badge: null },
    {
      name: "Logout",
      icon: LogOut,
      onClick: () => handleLogout(),
      badge: null,
    },
    { name: "back", icon: ForwardIcon, href: "/", badge: null },
  ];

  return (
    <div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {menuItems.map((item) => {
            const isActive = path === item.href;
            const MenuItem = item.href ? Link : 'a';
            return (
              <MenuItem
                key={item.name}
                href={item.href || undefined} // Ensure href is either a string or undefined
                onClick={item.onClick}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 mt-2 transition-all ${
                  isActive ? "bg-black text-white" : "text-muted-foreground hover:text-white hover:bg-black"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
                {item.badge && (
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {item.badge}
                  </Badge>
                )}
              </MenuItem>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export default DesktopSidebar;