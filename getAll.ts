import * as AWS from "aws-sdk";
import { failure, success } from "./responses";
const db = new AWS.DynamoDB.DocumentClient();

export default async function handleGetAll(){
    const params = {
        TableName: 'ingredients'
    };

    try {
        const result = await db.scan(params).promise();
        return success(result.Items);
    } catch (dbError) {
        console.log('error', dbError);
        return failure(dbError);
    } 
}