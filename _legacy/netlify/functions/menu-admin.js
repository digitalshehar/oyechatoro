const { GoogleSpreadsheet } = require('google-spreadsheet');

// This will store menu data in a Google Sheet for simplicity
exports.handler = async function(event, context) {
    if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Missing Google Sheets credentials' })
        };
    }

    // Basic auth check
    const authHeader = event.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET_KEY}`) {
        return {
            statusCode: 401,
            body: JSON.stringify({ error: 'Unauthorized' })
        };
    }

    try {
        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
        await doc.useServiceAccountAuth(JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY));
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];

        const { action, item } = JSON.parse(event.body);

        switch (action) {
            case 'list':
                await sheet.loadCells();
                const rows = await sheet.getRows();
                return {
                    statusCode: 200,
                    body: JSON.stringify(rows.map(row => ({
                        id: row.id,
                        name: row.name,
                        category: row.category,
                        price: row.price,
                        description: row.description,
                        isVeg: row.isVeg === 'true',
                        isBestseller: row.isBestseller === 'true'
                    })))
                };

            case 'add':
                await sheet.addRow({
                    id: Date.now().toString(),
                    name: item.name,
                    category: item.category,
                    price: item.price,
                    description: item.description,
                    isVeg: item.isVeg.toString(),
                    isBestseller: (item.isBestseller || false).toString()
                });
                return {
                    statusCode: 200,
                    body: JSON.stringify({ message: 'Item added successfully' })
                };

            case 'update':
                const updateRows = await sheet.getRows();
                const updateRow = updateRows.find(row => row.id === item.id);
                if (updateRow) {
                    updateRow.name = item.name;
                    updateRow.category = item.category;
                    updateRow.price = item.price;
                    updateRow.description = item.description;
                    updateRow.isVeg = item.isVeg.toString();
                    updateRow.isBestseller = (item.isBestseller || false).toString();
                    await updateRow.save();
                    return {
                        statusCode: 200,
                        body: JSON.stringify({ message: 'Item updated successfully' })
                    };
                }
                return {
                    statusCode: 404,
                    body: JSON.stringify({ error: 'Item not found' })
                };

            case 'delete':
                const deleteRows = await sheet.getRows();
                const deleteRow = deleteRows.find(row => row.id === item.id);
                if (deleteRow) {
                    await deleteRow.delete();
                    return {
                        statusCode: 200,
                        body: JSON.stringify({ message: 'Item deleted successfully' })
                    };
                }
                return {
                    statusCode: 404,
                    body: JSON.stringify({ error: 'Item not found' })
                };

            default:
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: 'Invalid action' })
                };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};