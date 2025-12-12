
import ClientLayout from './client-layout';
import { auth } from '@/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard - Oye Chatoro',
    robots: {
        index: false,
        follow: false,
    },
};

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    return <ClientLayout session={session}>{children}</ClientLayout>;
}
