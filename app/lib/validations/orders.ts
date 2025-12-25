import { z } from 'zod';

const orderItemSchema = z.object({
    menuItemId: z.string().min(1, 'Menu Item ID is required'),
    quantity: z.number().int().min(1, 'Quantity must be at least 1'),
    name: z.string().min(1),
    price: z.number().min(0),
    notes: z.string().optional(),
});

export const createOrderSchema = z.object({
    items: z.array(orderItemSchema).min(1, 'Order must contain at least one item'),
    tableId: z.string().optional(),
    // Matching Prisma Enums: DineIn, Takeaway, Delivery
    type: z.enum(['DineIn', 'Takeaway', 'Delivery']).default('DineIn'),
    customerName: z.string().optional(),
    customerPhone: z.string().optional(),
    // Matching Prisma Enums: Cash, UPI, Card, Online (mapped 'OTHER' to 'Online' or similar if needed, sticking to known enums)
    paymentMethod: z.enum(['Cash', 'UPI', 'Card', 'Online']).default('Cash'),
    discount: z.number().min(0).default(0),
    notes: z.string().optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
