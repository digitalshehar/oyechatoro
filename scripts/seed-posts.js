import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig, Pool } from '@neondatabase/serverless';
import ws from 'ws';
import 'dotenv/config';

// Configure WebSocket for Node.js environment
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('Error: DATABASE_URL environment variable is missing.');
    process.exit(1);
}

console.log('DATABASE_URL loaded:', connectionString ? 'Yes' : 'No');
console.log('DATABASE_URL length:', connectionString.length);
console.log('DATABASE_URL start:', connectionString.substring(0, 15) + '...');

// Setup Neon Adapter
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

const posts = [
    {
        title: 'The Truth About Finding Good Food in Abu Road: A Local Guide',
        slug: 'ultimate-guide-abu-road-food',
        excerpt: 'Sick of the same old tasteless station food? Here is the honest, unfiltered truth about where to find the absolute best food in Abu Road.',
        content: `# Sach Batana... Ye Socha Tha? (Honest Food Guide)

So, you are in Abu Road. Maybe you are here for a train layover, or maybe you are visiting Mount Abu. Your stomach is growling, and you check Google Maps.
"Restaurants near me."

What do you see? A list of same-old places.
You walk into one. The menu is sticky. The waiter looks bored. You order a Paneer Butter Masala because that's "safe". It arrives. It's too oily, too sweet, and honestly? Disappointing.

I have been there. I live here. And I am tired of seeing people eat bad food in my city.

So, here is the truth. The *real* guide to finding food that actually tastes like... food.

## 1. The Railway Station Trap 🚂
Listen, the Rabri at the station is legendary. I will give you that. It is creamy, nutty, and 100% worth the hype.
But the actual *food* at the station stalls? It's survival food. It fills you up, but it won't make you happy.

## 2. Dhaba vs. Restaurant 🥘
Abu Road has some decent dhabas on the highway. Great for Dal Baati.
But what if you want a clean place? Air conditioning? A place where you can take your family without worrying about dust and flies?

That is where the options shrink.

## 3. Enter: Oye Chatoro (The Game Changer) 🚀
Okay, I might be biased, but hear me out.
We started Oye Chatoro because we wanted a place that had *vibes*.
*   We didn't want sad, yellow lighting. We wanted neon.
*   We didn't want just food. We wanted authentic flavors.
*   We didn't want just food. We wanted an *experience*.

### best vegetarian restaurant in Abu Road?
Yes. We are 100% Pure Veg. But not the "boring veg".
We are talking **Tandoori Paneer Pizza** (made in a real wood-fire oven, not an electric toaster).
We are talking **Bombay Style Pav Bhaji** that actually tastes like Bombay.
We are talking **Sizzling Brownies** that make heads turn when they come to the table.

## The Verdict?
If you want quick, cheap fuel? Eat a Samosa at the station.
If you want to sit down, relax, listen to good music, and eat food that makes you go *"Waah!"*?
Come to **Oye Chatoro**.

We are near the check post. You can't miss us.
See you there? 🍕`,
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
        author: 'Akshay (Local Foodie)',
        category: 'Guides',
        readingTime: '7 min',
        isRecipe: false,
        featured: true,
        status: 'Published',
        tags: ['Abu Road', 'Street Food', 'Restaurants']
    },
    {
        title: 'Planning a Birthday Party in Abu Road? Here is the Best Place!',
        slug: 'best-birthday-party-venue-abu-road',
        excerpt: 'Looking for the perfect spot to celebrate? From decoration to delicious food, find out why Oye Chatoro is the ultimate party destination.',
        content: `# Where to Celebrate in Abu Road? 🎉

So, your best friend's birthday is coming up. Or maybe it's your anniversary. You are scrolling through your phone, asking around: *"Yaar, Abu Road me party ke liye acchi jagah konsi hai?"* (Bro, which is a good place for a party in Abu Road?).

I get it. Most places are either too crowded, too expensive, or just... boring.

But if you want a celebration that feels *special* without breaking the bank, **Oye Chatoro** is the secret spot everyone is talking about.

## Why is it the Best Birthday Party Place? 🎂

### 1. The Vibe is unmatched
Unlike typical dull restaurants, this place has energy. The lighting is perfect for your Instagram stories (very important!), and the music keeps the mood alive. It feels young, vibrant, and happy.

### 2. Food for Everyone (Even picky eaters!)
We all have that one friend who only eats Pizza, and another who wants "Something Spicy".
*   **For the Pizza Lover:** The Tandoori Paneer Pizza is a crowd pleaser.
*   **For the Desi Soul:** The Chole Bhature or Pav Bhaji here is authentic Bombay style.
*   **For the Kids:** French Fries and Milkshakes. Done.

### 3. Pocket-Friendly Packages
You don't need a massive budget to have a massive fun time. A group of 10 people can eat like kings for a surprisingly affordable price.

---

## Tips for a Great Party 🎈

*   **Book a Table:** It gets busy on weekends. Call ahead (+91-9509913792) to reserve the best spot.
*   **Order the "Tower":** If they have a beverage tower or a large pizza, order it. It looks great in photos!
*   **Don't forget the Dessert:** End the meal with a sizzling brownie or a thick shake.

So next time you are planning a bash, skip the boring options. Come to Oye Chatoro. We promise to make your special day delicious! 🥳`,
        image: 'https://images.unsplash.com/photo-1530103862676-de3c9a59af57?auto=format&fit=crop&w=1200&q=80',
        author: 'Party Planner Priya',
        category: 'Lifestyle',
        readingTime: '4 min',
        isRecipe: false,
        featured: false,
        status: 'Published',
        tags: ['Birthday', 'Party Venue', 'Celebration']
    },
    {
        title: 'Top 5 Famous Foods of Abu Road (A Foodie Checklist)',
        slug: 'top-5-famous-food-abu-road',
        excerpt: 'From sweet Rabri to spicy Chaat, here is the ultimate bucket list for every food lover visiting Abu Road.',
        content: `# The Ultimate Abu Road Food Bucket List 📝

Abu Road might be a small town, but its flavors are BIG. If you call yourself a foodie, you cannot leave this city without ticking off these 5 items.

## 1. Station Rabri 🥛
**Where:** Abu Road Railway Station
**Why:** It is thick, creamy, and loaded with nuts. It is famous across India for a reason. Warning: It is heavy!

## 2. Katori Chaat @ Oye Chatoro 🥘
**Where:** Oye Chatoro (Near Check Post)
**Why:** Imagine a crispy fried bowl (katori) filled with spicy chole, potatoes, curd, and chutneys. You eat the filling, then you eat the bowl. It is chaotic and delicious.

## 3. Dal Baati Churma 🍛
**Where:** Local Dhabas on the Highway
**Why:** The signature dish of Rajasthan. Hard wheat rolls (Baati) dipped in spicy lentils (Dal) and loads of Ghee. It is not a meal; it is a nap-inducer.

## 4. Tandoori Pizza 🍕
**Where:** Oye Chatoro
**Why:** Italian dish, Indian heart. The smoky flavor from the tandoor makes this pizza unique compared to the electric oven ones you get elsewhere.

## 5. Poha Jalebi 🥨
**Where:** Roadside stalls (Morning only)
**Why:** The classic breakfast. Light, fluffy poha topped with sev, served with sugary hot Jalebis. The perfect start to your day.

---

## How many have you tried?
If you have scored 5/5, congratulations, you are a true Abu Road local! If not, what are you waiting for? Start eating! 😋`,
        image: 'https://images.unsplash.com/photo-1606491956689-2ea28c674675?auto=format&fit=crop&w=1200&q=80',
        author: 'Akshay (The Foodie Explorer)',
        category: 'Guides',
        readingTime: '5 min',
        isRecipe: false,
        featured: false,
        status: 'Published',
        tags: ['Famous Food', 'Street Food', 'Must Try']
    }
];

async function main() {
    console.log('Start seeding blog posts via Neon Adapter...');

    for (const post of posts) {
        const exists = await prisma.blogPost.findUnique({
            where: { slug: post.slug }
        });

        if (!exists) {
            await prisma.blogPost.create({
                data: post
            });
            console.log(`✅ Created post: ${post.title}`);
        } else {
            console.log(`⚠️ Post already exists (skipping): ${post.title}`);
        }
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error('Seeding error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
