import * as AWS from "aws-sdk";
import Ingredient from "./ingredient";
const db = new AWS.DynamoDB.DocumentClient();
import { error, failure, success } from "./responses";

export default async function handleAdd(ingredient: Ingredient) {
  console.log("ingredient", ingredient);
  if (!ingredient.ingredientId) {
    return error(`ingredientId is required:\n${JSON.stringify(ingredient)}`, 400);
  }

  const params = {
    TableName: "ingredients",
    Item: {
      ingredientId: ingredient.ingredientId,
      name: ingredient.name,
      type: ingredient.type,
      tags: ingredient.tags,
      location: ingredient.location,
      status: ingredient.status,
    } as Ingredient,
  };

  if (ingredient.expirationDate) {
    params.Item.expirationDate = ingredient.expirationDate;
  }

  try {
    await db.put(params).promise();
    return success(params.Item);
  } catch (dbError) {
    console.log("error", dbError);
    return failure(dbError);
  }
}
