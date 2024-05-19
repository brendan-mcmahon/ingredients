import * as aws from "aws-sdk";
import Ingredient from "./ingredient";
import { error, failure, success } from "./responses";
const db = new aws.DynamoDB.DocumentClient();

export default async function handleUpdate(ingredient: Ingredient) {
  console.log("updating ingredient:", ingredient);
  if (!ingredient.ingredientId) {
    return error(`ingredientId is required:\n${JSON.stringify(ingredient)}`, 400);
  }

  const attributes = [
    { name: "name", value: ingredient.name },
    { name: "type", value: ingredient.type },
    { name: "tags", value: ingredient.tags },
    { name: "status", value: ingredient.status },
    { name: "location", value: ingredient.location },
    { name: "statusDate", value: ingredient.statusDate },
    { name: "expirationDate", value: ingredient.expirationDate }
  ];

  const updateExpressionParts: string[] = [];
  const removeExpressionParts: string[] = [];
  const expressionAttributeValues: { [key: string]: any } = {};
  const expressionAttributeNames: { [key: string]: any } = {};

  attributes.forEach(attr => {
    if (typeof attr.value !== 'undefined') {
      const placeholder = `:${attr.name}`;
      const attributeName = `#${attr.name}`;
      if (attr.value === null) {
        removeExpressionParts.push(attributeName);
      } else {
        updateExpressionParts.push(`${attributeName} = ${placeholder}`);
        expressionAttributeValues[placeholder] = attr.value;
      }
      expressionAttributeNames[attributeName] = attr.name;
    }
  });

  let updateExpression = "SET " + updateExpressionParts.join(", ");
  if (removeExpressionParts.length > 0) {
    updateExpression += " REMOVE " + removeExpressionParts.join(", ");
  }

  const params = {
    TableName: "ingredients",
    Key: {
      ingredientId: ingredient.ingredientId,
    },
    UpdateExpression: updateExpression,
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
