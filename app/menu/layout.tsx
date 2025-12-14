
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Menu - Oye Chatoro | View Prices & Photos",
    description: "Explore our full menu with prices. Pizzas, Pastas, Chaats, Burgers, and more. 100% Pure Vegetarian Food in Abu Road.",
    alternates: {
        canonical: 'https://oyechatoro.com/menu'
    }
};

export default function MenuLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
