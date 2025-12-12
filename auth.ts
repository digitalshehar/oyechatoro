
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/app/lib/db';

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const email = credentials.email as string;
                const password = credentials.password as string;

                try {
                    // @ts-ignore
                    const staff = await prisma.staff.findFirst({
                        where: { email }
                    });

                    if (staff && (staff as any).password) {
                        const passwordsMatch = await bcrypt.compare(password, (staff as any).password);
                        if (passwordsMatch && staff.active) {
                            return {
                                id: staff.id,
                                name: staff.name,
                                email: (staff as any).email,
                                role: staff.role,
                            };
                        }
                    }

                    // Check Customer
                    const customer = await prisma.customer.findFirst({
                        where: { email }
                    });

                    if (customer && (customer as any).password) {
                        const passwordsMatch = await bcrypt.compare(password, (customer as any).password);
                        if (passwordsMatch) {
                            return {
                                id: customer.id,
                                name: customer.name,
                                email: customer.email,
                                role: 'Customer',
                            };
                        }
                    }
                } catch (error) {
                    console.error('Auth error:', error);
                    return null;
                }

                return null;
            },
        }),
    ],

    trustHost: true,
});
