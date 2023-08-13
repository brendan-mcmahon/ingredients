import handleGetAll from "./getAll";
import handleGet from "./get";
import handleAdd from "./add";
import handleUpdate from "./update";
import { APIGatewayProxyEvent } from "aws-lambda";
import { error } from "./responses";
import handleDelete from "./delete";

export const handler = async (event: APIGatewayProxyEvent) => {
  console.log("event", event);

  const ingredientId = event.queryStringParameters?.ingredientId;

  switch (event.httpMethod) {
    case "GET":
      return ingredientId ? await handleGet(ingredientId) : await handleGetAll();
    case "POST":
      return await handleAdd(JSON.parse(event.body || "{}"));
    case "PUT":
      return await handleUpdate(JSON.parse(event.body || "{}"));
    case "DELETE":
      return await handleDelete(ingredientId || "");
    default:
      return error("Method Not Allowed", 405);
  }
};
