import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import bcrypt from 'bcryptjs';

// Configure WebSocket
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Seeding database...\n');

    // ==================== MENU CATEGORIES ====================
    console.log('📁 Creating menu categories...');
    const categories = await Promise.all([
        prisma.menuCategory.upsert({
            where: { id: 'cat_pizza' },
            update: {},
            create: { id: 'cat_pizza', name: 'Pizza 🍕' }
        }),
        prisma.menuCategory.upsert({
            where: { id: 'cat_pasta' },
            update: {},
            create: { id: 'cat_pasta', name: 'Pasta 🍝' }
        }),
        prisma.menuCategory.upsert({
            where: { id: 'cat_chaat' },
            update: {},
            create: { id: 'cat_chaat', name: 'Chaat 🥗' }
        }),
        prisma.menuCategory.upsert({
            where: { id: 'cat_burger' },
            update: {},
            create: { id: 'cat_burger', name: 'Burgers 🍔' }
        }),
        prisma.menuCategory.upsert({
            where: { id: 'cat_beverages' },
            update: {},
            create: { id: 'cat_beverages', name: 'Beverages 🥤' }
        }),
    ]);
    console.log(`   ✅ Created ${categories.length} categories\n`);

    // ==================== MENU ITEMS ====================
    console.log('🍕 Creating menu items...');
    const menuItems = [
        // Pizzas
        { id: 'item_1', name: 'Margherita Pizza', price: 199, description: 'Classic cheese pizza with fresh tomato sauce', categoryId: 'cat_pizza', veg: true, isFeatured: true },
        { id: 'item_2', name: 'Paneer Tikka Pizza', price: 299, description: 'Spicy paneer tikka with onions and capsicum', categoryId: 'cat_pizza', veg: true, isFeatured: true },
        { id: 'item_3', name: 'Veggie Supreme', price: 349, description: 'Loaded with fresh vegetables', categoryId: 'cat_pizza', veg: true },
        { id: 'item_4', name: 'Cheese Burst Pizza', price: 329, description: 'Extra cheese filled crust', categoryId: 'cat_pizza', veg: true },
        // Pastas
        { id: 'item_5', name: 'White Sauce Pasta', price: 179, description: 'Creamy Alfredo sauce pasta', categoryId: 'cat_pasta', veg: true, isFeatured: true },
        { id: 'item_6', name: 'Red Sauce Pasta', price: 159, description: 'Tangy tomato sauce pasta', categoryId: 'cat_pasta', veg: true },
        { id: 'item_7', name: 'Pink Sauce Pasta', price: 189, description: 'Mix of white and red sauce', categoryId: 'cat_pasta', veg: true },
        // Chaats
        { id: 'item_8', name: 'Dahi Papdi Chaat', price: 89, description: 'Crispy papdi with sweet curd', categoryId: 'cat_chaat', veg: true, isFeatured: true },
        { id: 'item_9', name: 'Pani Puri', price: 59, description: '6 pieces with sweet and spicy pani', categoryId: 'cat_chaat', veg: true },
        { id: 'item_10', name: 'Bhel Puri', price: 69, description: 'Crispy puffed rice with chutneys', categoryId: 'cat_chaat', veg: true },
        // Burgers
        { id: 'item_11', name: 'Veg Burger', price: 99, description: 'Classic veggie patty burger', categoryId: 'cat_burger', veg: true },
        { id: 'item_12', name: 'Paneer Burger', price: 129, description: 'Crispy paneer patty with cheese', categoryId: 'cat_burger', veg: true, isFeatured: true },
        // Beverages
        { id: 'item_13', name: 'Masala Chai', price: 29, description: 'Hot Indian spiced tea', categoryId: 'cat_beverages', veg: true },
        { id: 'item_14', name: 'Cold Coffee', price: 79, description: 'Creamy cold coffee with ice', categoryId: 'cat_beverages', veg: true },
        { id: 'item_15', name: 'Fresh Lime Soda', price: 49, description: 'Refreshing lime with soda', categoryId: 'cat_beverages', veg: true },
    ];

    for (const item of menuItems) {
        await prisma.menuItem.upsert({
            where: { id: item.id },
            update: item,
            create: { ...item, slug: item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), status: 'Active' as any, isDigitalMenu: true }
        });
    }
    console.log(`   ✅ Created ${menuItems.length} menu items\n`);

    // ==================== BLOG POSTS ====================
    console.log('📝 Creating blog posts...');
    const blogPosts = [
        {
            id: 'post_1',
            title: 'Welcome to Oye Chatoro!',
            slug: 'welcome-to-oye-chatoro',
            excerpt: 'We are excited to announce the grand opening of our new outlet in Abu Road.',
            content: 'Welcome to Oye Chatoro! We are thrilled to bring the authentic flavors of street food to Abu Road. Our mission is to serve happiness on every plate.',
            author: 'Admin',
            category: 'News',
            tags: ['Grand Opening', 'Abu Road'],
            seoTitle: 'Welcome to Oye Chatoro - Best Street Food in Abu Road',
            seoDescription: 'Oye Chatoro is now open in Abu Road!',
            status: 'Published',
            featured: true
        },
        {
            id: 'post_2',
            title: 'Best Restaurant in Abu Road',
            slug: 'best-restaurant-in-abu-road',
            excerpt: 'Discover why Oye Chatoro is the top choice for vegetarian food lovers.',
            content: '## Best Restaurant in Abu Road\n\nOye Chatoro offers 100% pure vegetarian food with live kitchen, AC dining, and FSSAI licensed quality.',
            author: 'Admin',
            category: 'About Us',
            tags: ['Restaurant in Abu Road', 'Best Restaurant', 'Pure Veg'],
            seoTitle: 'Best Restaurant in Abu Road | Oye Chatoro',
            seoDescription: 'Looking for the best restaurant in Abu Road? Oye Chatoro offers pure veg food.',
            status: 'Published',
            featured: true
        },
        {
            id: 'post_3',
            title: 'Top 5 Must-Try Dishes',
            slug: 'top-5-must-try-dishes',
            excerpt: 'Discover the customer favorites that you absolutely cannot miss.',
            content: '1. Paneer Tikka Pizza\n2. White Sauce Pasta\n3. Dahi Papdi Chaat\n4. Veggie Supreme\n5. Masala Chai',
            author: 'Chef',
            category: 'Food Guide',
            tags: ['Pizza', 'Pasta', 'Chaat'],
            seoTitle: 'Top 5 Must-Try Dishes at Oye Chatoro',
            seoDescription: 'Discover the top 5 dishes you must try at Oye Chatoro Abu Road.',
            status: 'Published'
        },
    ];

    for (const post of blogPosts) {
        await prisma.blogPost.upsert({
            where: { id: post.id },
            update: {
                title: post.title,
                slug: post.slug,
                excerpt: post.excerpt,
                content: post.content,
                author: post.author,
                category: {
                    connectOrCreate: {
                        where: { name: post.category },
                        create: {
                            name: post.category,
                            slug: post.category.toLowerCase().replace(/\s+/g, '-')
                        }
                    }
                },
                tags: {
                    connectOrCreate: post.tags.map(tag => ({
                        where: { name: tag },
                        create: { name: tag, slug: tag.toLowerCase().replace(/\s+/g, '-') }
                    }))
                },
                seoTitle: post.seoTitle,
                seoDescription: post.seoDescription,
                status: post.status as 'Draft' | 'Published',
                featured: post.featured ?? false
            },
            create: {
                id: post.id,
                title: post.title,
                slug: post.slug,
                excerpt: post.excerpt,
                content: post.content,
                author: post.author,
                category: {
                    connectOrCreate: {
                        where: { name: post.category },
                        create: {
                            name: post.category,
                            slug: post.category.toLowerCase().replace(/\s+/g, '-')
                        }
                    }
                },
                tags: {
                    connectOrCreate: post.tags.map(tag => ({
                        where: { name: tag },
                        create: { name: tag, slug: tag.toLowerCase().replace(/\s+/g, '-') }
                    }))
                },
                seoTitle: post.seoTitle,
                seoDescription: post.seoDescription,
                status: post.status as 'Draft' | 'Published',
                featured: post.featured ?? false
            }
        });
    }
    console.log(`   ✅ Created ${blogPosts.length} blog posts\n`);

    // ==================== SAMPLE CUSTOMER ====================
    console.log('👤 Creating sample customer...');
    await prisma.customer.upsert({
        where: { phone: '9509913792' },
        update: {},
        create: {
            name: 'Oye Chatoro',
            phone: '9509913792',
            email: 'hello@oyechatoro.com',
            totalOrders: 0,
            totalSpent: 0,
            loyaltyPoints: 100
        }
    });
    console.log('   ✅ Created sample customer\n');

    // ==================== STAFF (RBAC) ====================
    console.log('👮 Creating staff accounts...');
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    const staffPassword = await bcrypt.hash('Staff@123', 10);
    const managerPassword = await bcrypt.hash('Manager@123', 10);

    const staffMembers = [
        { id: 'admin_user', name: 'Super Admin', email: 'admin@oyechatoro.com', password: hashedPassword, role: 'Admin' },
        { id: 'manager_user', name: 'Restaurant Manager', email: 'manager@oyechatoro.com', password: managerPassword, role: 'Manager' },
        { id: 'staff_user', name: 'Rahul Service', email: 'staff@oyechatoro.com', password: staffPassword, role: 'Staff' },
        { id: 'chef_user', name: 'Head Chef', email: 'chef@oyechatoro.com', password: staffPassword, role: 'Chef' },
    ];

    for (const staff of staffMembers) {
        await prisma.staff.upsert({
            where: { id: staff.id },
            update: {
                name: staff.name,
                email: staff.email,
                password: staff.password,
                role: staff.role as any
            },
            create: {
                id: staff.id,
                name: staff.name,
                email: staff.email,
                password: staff.password,
                role: staff.role as any,
                active: true
            }
        });
    }
    console.log(`   ✅ Created ${staffMembers.length} staff accounts\n`);

    console.log('🎉 Database seeding completed!\n');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
