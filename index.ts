import getAll from "./getAll";
import get from "./get";
import add from "./add";
import update from "./update";
import { APIGatewayProxyEvent } from "aws-lambda";
import { error } from "./responses";

export const handler = async (event: APIGatewayProxyEvent) => {
  console.log("event", event);

  if (!event.body) return error("invalid request, you are missing the parameter body");

  switch (event.httpMethod) {
    case "GET":
      const ingredientId = event.queryStringParameters?.ingredientId;
      return ingredientId ? await get(ingredientId) : await getAll();
    case "POST":
      return await add(JSON.parse(event.body));
    case "PUT":
      return await update(JSON.parse(event.body));
    default:
      return error("Method Not Allowed", 405);
  }
};
