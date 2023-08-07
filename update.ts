import * as aws from "aws-sdk";
import Ingredient from "./ingredient";
import { failure, success } from "./responses";
const db = new aws.DynamoDB.DocumentClient();

export default async function update(ingredient: Ingredient) {
  console.log("updating ingredient:", ingredient);

  const params = {
    TableName: "ingredients",
    Key: {
      ingredientId: ingredient.ingredientId,
    },
    UpdateExpression: "set #name = :name, #tags = :tags, #status = :status",
    ExpressionAttributeNames: {
      "#name": "name",
      "#tags": "tags",
      "#status": "status",
    },
    ExpressionAttributeValues: {
      ":name": ingredient.name,
      ":tags": ingredient.tags,
      ":status": ingredient.status,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    const result = await db.update(params).promise();
    return success(result.Attributes);
  } catch (dbError) {
    console.log("error", dbError);
    return failure(dbError);
  }
}
