const getAll = require("./getAll");
const get = require("./get");
const add = require("./add");
const update = require("./update");

exports.handler = async (event) => {
  console.log("event", event);

  const headers = {
    "Access-Control-Allow-Origin": "*", // Adjust this for production!
    "Access-Control-Allow-Credentials": true,
  };

  const ingredientId = event.queryStringParameters?.ingredientId;
  switch (event.httpMethod) {
    case "GET":
        return ingredientId ? await get(ingredientId) : await getAll();
    case "POST":
        return await add(JSON.parse(event.body));
    case "PUT":
        return await update(ingredientId, JSON.parse(event.body));
    default:
        return {
            statusCode: 405,
            headers,
            body: "Method Not Allowed",
        };
    }
};
