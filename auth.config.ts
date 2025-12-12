
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
            }
            return session;
        },
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

                    // Debug Logging
                    // console.log('Middleware Check:', { path: nextUrl.pathname, role: userRole });

                    // Restrict Command Center (Root /dashboard) to Admin/Manager only
                    if (nextUrl.pathname === '/dashboard') {
                        if (userRole === 'Staff') {
                            return Response.redirect(new URL('/dashboard/pos', nextUrl));
                        } else if (userRole === 'Chef') {
                            return Response.redirect(new URL('/dashboard/kitchen', nextUrl));
                        }
                    }

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
