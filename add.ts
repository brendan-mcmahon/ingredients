import * as AWS from "aws-sdk";
import Ingredient from "./ingredient";
const db = new AWS.DynamoDB.DocumentClient();
import { failure, success } from "./responses";

export default async function add(ingredient: Ingredient) {
    // const ingredient = JSON.parse(event.body);
        console.log('ingredient', ingredient);

        const params = {
            TableName: 'ingredients',
            Item: {
                'ingredientId': ingredient.ingredientId,
                'name': ingredient.name,
                'tags': ingredient.tags,
                'status': ingredient.status,
            }
        };

        try {
            await db.put(params).promise();
            return success(params.Item);
        } catch (dbError) {
            console.log('error', dbError);
            return failure(dbError);
        }
}