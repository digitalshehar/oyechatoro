
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login - Oye Chatoro | Admin & Staff Access",
    description: "Secure login for Oye Chatoro staff and management. Access the kitchen dashboard, POS, and order management system.",
    robots: {
        index: false, // Don't index login page
        follow: false
    }
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
