import * as aws from "aws-sdk";
import Ingredient from "./ingredient";
import { error, failure, success } from "./responses";
const db = new aws.DynamoDB.DocumentClient();

export default async function handleUpdate(ingredient: Ingredient) {
  console.log("updating ingredient:", ingredient);
  if (!ingredient.ingredientId) {
    return error(`ingredientId is required:\n${JSON.stringify(ingredient)}`, 400);
  }

  const updateExpressionParts = [
    "#name = :name",
    "#type = :type",
    "#tags = :tags",
    "#status = :status"
  ];
  const expressionAttributeValues: any = {
    ":name": ingredient.name,
    ":type": ingredient.type,
    ":tags": ingredient.tags,
    ":status": ingredient.status
  };
  const expressionAttributeNames: any = {
    "#name": "name",
    "#type": "type",
    "#tags": "tags",
    "#status": "status"
  };
  
  if (ingredient.statusDate) {
    updateExpressionParts.push("#statusDate = :statusDate");
    expressionAttributeValues[":statusDate"] = ingredient.statusDate;
    expressionAttributeNames["#statusDate"] = "statusDate";
  }

  if (ingredient.expirationDate) {
    updateExpressionParts.push("#expirationDate = :expirationDate");
    expressionAttributeValues[":expirationDate"] = ingredient.expirationDate;
    expressionAttributeNames["#expirationDate"] = "expirationDate";
  }
  
  const params = {
    TableName: "ingredients",
    Key: {
      ingredientId: ingredient.ingredientId,
    },
    UpdateExpression: "set " + updateExpressionParts.join(", "),
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
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
