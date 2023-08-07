import getAll from "./getAll";
import get from "./get";
import add from "./add";
import update from "./update";
import { headers } from "./headers";
import { APIGatewayProxyEvent } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent) => {
  console.log("event", event);

  if (!event.body) {
    return {
      statusCode: 400,
      headers,
      body: "invalid request, you are missing the parameter body",
    };
  }

  const ingredientId = event.queryStringParameters?.ingredientId;
  switch (event.httpMethod) {
    case "GET":
      return ingredientId ? await get(ingredientId) : await getAll();
    case "POST":
      return await add(JSON.parse(event.body));
    case "PUT":
      return await update(JSON.parse(event.body));
    default:
      return {
        statusCode: 405,
        headers,
        body: "Method Not Allowed",
      };
  }
};
