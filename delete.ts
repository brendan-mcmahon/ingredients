import * as AWS from "aws-sdk";
import { failure, success } from "./responses";
const db = new AWS.DynamoDB.DocumentClient();

export default async function handleDelete(ingredientId: string) {
    const params = {
        TableName: 'ingredients',
        Key: {
            'ingredientId': ingredientId
        }
    };

    try {
        await db.delete(params).promise();
        return success({ status: true });
    } catch (dbError) {
        console.log('error', dbError);
        return failure(dbError);
    }
}