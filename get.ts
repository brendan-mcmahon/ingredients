import { headers } from "./headers";

import * as AWS from "aws-sdk";
const db = new AWS.DynamoDB.DocumentClient();

export default async function get(ingredientId: string) {
    const params = {
        TableName: 'ingredients',
        Key: {
            'ingredientId': ingredientId
        }
    };

    try {
        const result = await db.get(params).promise();
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(result.Item),
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