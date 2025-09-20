

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Friends',
      url: '#',
      items: [
        {
          title: 'Home',
          url: '/friends',
          isActive: true,
        },
        {
          title: 'Recommended',
          url: '/friends/recommended'
          
        },
        {
          title: 'Incomming Request',
          url: '/friends/incomming-request',          
        },
        {
          title: 'Outgoing Request',
          url: '/friends/outgoing-request',
        },
        {
          title: 'My Friends',
          url: '/friends/my-friends',
        }
      
      ],
    },
  ],
};

export function FriendSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item: any) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item: any) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
