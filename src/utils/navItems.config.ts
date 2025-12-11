
import { NavSection } from "@/interfaces/dashboard.interface";
import { getDefaultDashboardRoute } from "./auth";
import { Role } from "@/constants/user.constant";

export const getCommonNavItems = (role: Role): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: Object.values(Role),
                },

            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings", // ✅ String
                    roles: Object.values(Role.USER) as Role[],
                },
            ],
        },
    ]
}

export const moderatorNavItems: NavSection[] = [
    {
        title: "Patient Management",
        items: [
            {
                title: "Appointments",
                href: "/moderator/dashboard/appoinments",
                icon: "Calendar", // ✅ String
                badge: "3",
                roles: Object.values(Role.MODERATOR) as Role[],
            },
            {
                title: "My Schedules",
                href: "/moderator/dashboard/my-schedules",
                icon: "Clock", // ✅ String
                roles: Object.values(Role.MODERATOR) as Role[],
            },
            {
                title: "Prescriptions",
                href: "/moderator/dashboard/prescriptions",
                icon: "FileText", // ✅ String
                roles: Object.values(Role.MODERATOR) as Role[],
            },
        ],
    }
]

export const userNavItems: NavSection[] = [
    {
        title: "Challenge",
        items: [
            {
                title: "My Challenge",
                href: "/dashboard/my-challenge",
                icon: "Calendar", // ✅ String
                roles: Object.values(Role.USER) as Role[],
            },
            {
                title: "My Tutors",
                href: "/dashboard/my-tutors",
                icon: "ClipboardList", // ✅ String
                roles: Object.values(Role.USER) as Role[],
            },
        ],
    },
  

]

export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Admins",
                href: "/admin/dashboard/admins-management",
                icon: "Shield", // ✅ String
                roles: Object.values(Role.ADMIN) as Role[],
            },
            {
                title: "Users",
                href: "/admin/dashboard/users-management",
                icon: "Stethoscope", // ✅ String
                roles: Object.values(Role.ADMIN) as Role[],
            },
            {
                title: "Pages",
                href: "/admin/dashboard/pages-management",
                icon: "Users", // ✅ String
                roles: Object.values(Role.ADMIN) as Role[],
            },
        ],
    },
   
]

export const getNavItemsByRole = (role: Role): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "MODERATOR":
            return [...commonNavItems, ...moderatorNavItems];
        case "USER":
            return [...commonNavItems, ...userNavItems];
        default:
            return [];
    }
}