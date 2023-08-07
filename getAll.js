const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

export default async function getAll(){
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