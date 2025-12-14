
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Food Stories - Oye Chatoro | Recipes, News & Culture",
    description: "Read the latest food stories, recipes, and updates from Oye Chatoro. Discover the culture behind Abu Road's favorite street food.",
    alternates: {
        canonical: 'https://oyechatoro.com/blog'
    }
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
