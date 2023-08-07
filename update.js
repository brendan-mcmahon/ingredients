const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

export default async function update(ingredientId, ingredient) {
    console.log("updating ingredient:", ingredient);

    const params = {
      TableName: "ingredients",
      Key: {
        ingredientId: ingredient.id,
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
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result.Attributes),
      };
    } catch (dbError) {
      console.log("error", dbError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify(dbError),
      };
    }
}