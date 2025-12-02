// exact : ["/my-profile", "settings"]

import { Role } from "@/constants/user.constant";

//   patterns: [/^\/dashboard/, /^\/USER/], // Routes starting with /dashboard/* /USER/*
export type RouteConfig = {
    exact: string[],
    patterns: RegExp[],
}

export const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/settings"],
    patterns: [], // [/password/change-password, /password/reset-password => /password/*]
}

export const MODERATORProtectedRoutes: RouteConfig = {
    patterns: [/^\/moderator/], // Routes starting with /MODERATOR/* , /assitants, /appointments/*
    exact: [], // "/assistants"
}

export const adminProtectedRoutes: RouteConfig = {
    patterns: [/^\/admin/], // Routes starting with /admin/*
    exact: [], // "/admins"
}

export const USERProtectedRoutes: RouteConfig = {
    patterns: [/^\/dashboard/], // Routes starting with /dashboard/*
    exact: [], // "/dashboard"
}

export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route: string) => route === pathname);
}

export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
    if (routes.exact.includes(pathname)) {
        return true;
    }
    return routes.patterns.some((pattern: RegExp) => pattern.test(pathname))
    // if pathname === /dashboard/my-appointments => matches /^\/dashboard/ => true
}

export const getRouteOwner = (pathname: string): "ADMIN" | "MODERATOR" | "USER" | "COMMON" | null => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return "ADMIN";
    }
    if (isRouteMatches(pathname, MODERATORProtectedRoutes)) {
        return "MODERATOR";
    }
    if (isRouteMatches(pathname, USERProtectedRoutes)) {
        return "USER";
    }
    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    }
    return null;
}

export const getDefaultDashboardRoute = (role: Role): string => {
    if (role === "ADMIN") {
        return "/admin/dashboard";
    }
    if (role === "MODERATOR") {
        return "/moderator/dashboard";
    }
    if (role === "USER") {
        return "/dashboard";
    }
    return "/";
}

export const isValidRedirectForRole = (redirectPath: string, role: Role): boolean => {
    const routeOwner = getRouteOwner(redirectPath);

    if (routeOwner === null || routeOwner === "COMMON") {
        return true;
    }

    if (routeOwner === role) {
        return true;
    }

    return false;
}