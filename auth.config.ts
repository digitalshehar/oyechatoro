
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const userRole = (auth?.user as any)?.role; // Access role from session

            // 1. Define Protected Routes
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

            // 2. Define Login Routes (to redirect AWAY from if logged in)
            const isLoginRoute =
                nextUrl.pathname.startsWith('/login') ||
                nextUrl.pathname.startsWith('/staff/login') ||
                nextUrl.pathname.startsWith('/chef/login');

            if (isOnDashboard) {
                if (isLoggedIn) {
                    // Block Customers from accessing Dashboard
                    if (userRole === 'Customer') return false;
                    return true;
                }
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn && isLoginRoute) {
                // 3. Smart Redirect based on Role
                if (userRole === 'Chef') {
                    return Response.redirect(new URL('/dashboard/kitchen', nextUrl));
                } else if (userRole === 'Staff') {
                    return Response.redirect(new URL('/dashboard/pos', nextUrl));
                } else if (userRole === 'Customer') {
                    return Response.redirect(new URL('/profile', nextUrl));
                } else {
                    // Admin or Manager
                    return Response.redirect(new URL('/dashboard', nextUrl));
                }
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
