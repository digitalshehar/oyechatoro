import { prisma } from '@/app/lib/db';

interface RecipeItem {
    inventoryItemId: number;
    quantity: number;
}

export async function updateInventoryForOrder(items: any[], action: 'deduct' | 'restore') {
    try {
        const transactionOps = [];

        for (const item of items) {
            // Find menu item to get recipe
            // Ideally we should store menuItemId in the order items, but finding by name is a fallback
            const menuItem = await prisma.menuItem.findFirst({
                where: { name: item.name }
            });

            if (menuItem?.recipe) {
                const recipe = menuItem.recipe as unknown as RecipeItem[];

                for (const ingredient of recipe) {
                    const quantityUsed = ingredient.quantity * item.quantity;
                    const change = action === 'deduct' ? -quantityUsed : quantityUsed;

                    transactionOps.push(
                        prisma.inventoryItem.update({
                            where: { id: ingredient.inventoryItemId },
                            data: { currentStock: { increment: change } }
                        })
                    );
                }
            }
        }

        if (transactionOps.length > 0) {
            await prisma.$transaction(transactionOps);
            console.log(`Inventory updated: ${action} for ${items.length} items`);
        }
    } catch (error) {
        console.error('Failed to update inventory:', error);
        // Don't throw logic error to prevent order status update failure? 
        // Or throw to ensure consistency? For now, log only so operations aren't blocked.
    }
}
