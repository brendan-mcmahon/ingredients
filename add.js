const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

export default async function add(ingredient) {
    // const ingredient = JSON.parse(event.body);
        console.log('ingredient', ingredient);

        const params = {
            TableName: 'ingredients',
            Item: {
                'ingredientId': ingredient.id,
                'name': ingredient.name,
                'tags': ingredient.tags,
                'status': ingredient.status,
            }
        };

        try {
            await db.put(params).promise();
            
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(params.Item),
            };
        } catch (dbError) {
            console.log('error', dbError);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify(dbError),
            };
        }
}