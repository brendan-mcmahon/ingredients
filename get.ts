import * as AWS from "aws-sdk";
import { failure, success } from "./responses";
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
        return success(result.Item);
    } catch (dbError) {
        console.log('error', dbError);
        return failure(dbError);
    }
}