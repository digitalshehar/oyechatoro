import { z } from 'zod';

export const wastageSchema = z.object({
    inventoryItemId: z.number().int().min(1, 'Item ID required'),
    quantity: z.number().min(0.01, 'Quantity must be positive'),
    reason: z.string().min(3, 'Reason must be descriptive'),
});

export type WastageInput = z.infer<typeof wastageSchema>;
