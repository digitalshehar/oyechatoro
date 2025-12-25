import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { auth } from '@/auth';
import { logAudit } from '@/app/lib/audit';
import { translateToHindi } from '@/app/lib/local-translator';
import { translateContent } from '@/app/lib/seo-utils';

// PATCH update menu item - Protected
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();

        // Extract update data and remove id if present
        const { id: _, ...updateData } = body;

        // Automatic Hindi Translation Update (Local First, Gemini as enhancement)
        let finalUpdateData = { ...updateData };
        const apiKey = process.env.GEMINI_API_KEY;

        if (updateData.name || updateData.description) {
            try {
                // Fetch current item to get existing translations and missing fields
                const existingItem = await prisma.menuItem.findUnique({ where: { id } });
                if (existingItem) {
                    const nameToTranslate = updateData.name || existingItem.name;
                    const descToTranslate = updateData.description || existingItem.description;

                    // 1. Local Translation (Always Fast, No API)
                    const existingTranslations = (existingItem.translations as any) || {};
                    const hiNamespace = existingTranslations.hi || {};

                    hiNamespace.name = translateToHindi(nameToTranslate);
                    hiNamespace.description = translateToHindi(descToTranslate);

                    finalUpdateData.translations = {
                        ...existingTranslations,
                        hi: hiNamespace
                    };

                    // 2. Gemini Enhancement (Only if Key is valid)
                    if (apiKey && apiKey.startsWith('AIza')) {
                        try {
                            const hiResult = await translateContent({ name: nameToTranslate, description: descToTranslate }, 'Hindi', apiKey);
                            if (hiResult) {
                                finalUpdateData.translations.hi = {
                                    name: hiResult.name,
                                    description: hiResult.description
                                };
                            }
                        } catch (err) {
                            console.warn('Gemini auto-translation update enhancement failed:', err);
                        }
                    }
                }
            } catch (err) {
                console.error('Auto-translation update failed:', err);
            }
        }

        const item = await prisma.menuItem.update({
            where: { id },
            data: finalUpdateData,
        });

        await logAudit('UPDATE_MENU_ITEM', 'MenuItem', item.id, { updates: Object.keys(updateData) });

        return NextResponse.json(item);
    } catch (error) {
        console.error('Error updating menu item:', error);
        return NextResponse.json({ error: 'Failed to update menu item' }, { status: 500 });
    }
}

// DELETE menu item - Protected
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        // Delete related cart items first to avoid FK constraint error
        await prisma.cartItem.deleteMany({
            where: { menuItemId: id },
        });

        const item = await prisma.menuItem.delete({
            where: { id },
        });

        await logAudit('DELETE_MENU_ITEM', 'MenuItem', id, { name: item.name });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting menu item:', error);
        return NextResponse.json({ error: 'Failed to delete menu item' }, { status: 500 });
    }
}
