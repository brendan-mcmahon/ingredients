// Import AWS SDK
const AWS = require('aws-sdk');

// Create DynamoDB service object
const db = new AWS.DynamoDB.DocumentClient();

// Your Lambda function
exports.handler = async (event) => {
    // Assuming the ingredient comes from event.body
    console.log('event', event)
    const ingredient = JSON.parse(event.body);
    console.log('ingredient', ingredient);

    // Construct params for DynamoDB
    const params = {
        TableName: 'ingredients',
        Item: {
            'ingredientId': ingredient.id, // assuming it has a property "id"
            'name': ingredient.name // assuming it has a property "name"
        }
    };

    // Save the ingredient
    try {
        await db.put(params).promise();
        console.log('success?');
        return {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
    } catch (dbError) {
        console.log('error', dbError);
        return {
            statusCode: 500,
            body: JSON.stringify(dbError),
        };
    }
};
