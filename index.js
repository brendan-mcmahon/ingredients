const AWS = require('aws-sdk');

const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log('event', event);
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
            headers: {
                "Access-Control-Allow-Origin": "*", // Adjust this for production!
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify(params.Item),
        };
    } catch (dbError) {
        console.log('error', dbError);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Adjust this for production!
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify(dbError),
        };
    }
};
