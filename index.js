const AWS = require('aws-sdk');

const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log('event', event);
    
    const headers = {
        "Access-Control-Allow-Origin": "*", // Adjust this for production!
        "Access-Control-Allow-Credentials": true
    };

    // Handle GET request
    if (event.httpMethod === 'GET') {
        const ingredientId = event.queryStringParameters?.ingredientId;

        if (!ingredientId) {
            const params = {
                TableName: 'ingredients'
            };
    
            try {
                const result = await db.scan(params).promise();
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify(result.Items),
                };
            } catch (dbError) {
                console.log('error', dbError);
                return {
                    statusCode: 500,
                    headers,
                    body: JSON.stringify(dbError),
                };
            }
        }

        const params = {
            TableName: 'ingredients',
            Key: {
                'ingredientId': ingredientId
            }
        };

        try {
            const result = await db.get(params).promise();
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(result.Item),
            };
        } catch (dbError) {
            console.log('error', dbError);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify(dbError),
            };
        }
    }

    // Handle POST request
    if (event.httpMethod === 'POST') {
        const ingredient = JSON.parse(event.body);
        console.log('ingredient', ingredient);

        const params = {
            TableName: 'ingredients',
            Item: {
                'ingredientId': ingredient.id,
                'name': ingredient.name
            }
        };

        try {
            await db.put(params).promise();
            console.log('success?');
            
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(params.Item),
            };
        } catch (dbError) {
            console.log('error', dbError);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify(dbError),
            };
        }
    }

    // Return method not allowed if neither GET nor POST
    return {
        statusCode: 405,
        headers,
        body: 'Method Not Allowed',
    };
};
