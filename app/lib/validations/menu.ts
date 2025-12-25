import { z } from 'zod';

export const menuItemSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
    description: z.string().optional(),
    price: z.number().min(0, 'Price must be positive'),
    categoryId: z.string().min(1, 'Category is required'),
    image: z.string().url('Invalid image URL').optional().or(z.literal('')),
    isVegetarian: z.boolean().default(true),
    isVegan: z.boolean().default(false),
    isGlutenFree: z.boolean().default(false),
    spicinessLevel: z.enum(['NONE', 'MILD', 'MEDIUM', 'HOT', 'EXTRA_HOT']).default('NONE'),
    isAvailable: z.boolean().default(true),
    preparationTime: z.number().int().min(0).optional(),
    calories: z.number().int().min(0).optional(),
});

export const categorySchema = z.object({
    name: z.string().min(1, 'Name is required').max(50, 'Name is too long'),
    description: z.string().optional(),
    order: z.number().int().default(0),
});

export type MenuItemInput = z.infer<typeof menuItemSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
