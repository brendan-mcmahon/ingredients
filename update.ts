import * as aws from "aws-sdk";
import Ingredient from "./ingredient";
import { error, failure, success } from "./responses";
const db = new aws.DynamoDB.DocumentClient();

export default async function handleUpdate(ingredient: Ingredient) {
  console.log("updating ingredient:", ingredient);
  if (!ingredient.ingredientId) {
      return error(`ingredientId is required:\n${JSON.stringify(ingredient)}`, 400);
  }

  const params = {
    TableName: "ingredients",
    Key: {
      ingredientId: ingredient.ingredientId,
    },
    UpdateExpression: "set #name = :name, #type = :type, #tags = :tags, #status = :status, #statusDate = :statusDate",
    ExpressionAttributeNames: {
      "#name": "name",
      "#type": "type",
      "#tags": "tags",
      "#status": "status",
      "#statusDate": "statusDate",
    },
    ExpressionAttributeValues: {
      ":name": ingredient.name,
      ":type": ingredient.type,
      ":tags": ingredient.tags,
      ":status": ingredient.status,
      ":statusDate": ingredient.statusDate,
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
