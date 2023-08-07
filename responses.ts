const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
};

export function success(body: any) {
    return {
        statusCode: 200,
        headers,
        body: JSON.stringify(body)
    }
}

export function failure(error: any) {
    return {
        statusCode: 500,
        headers,
        body: JSON.stringify(error)
    }
}

export function error(error: any, statusCode: number = 400) {
    return {
        statusCode: statusCode,
        headers,
        body: JSON.stringify(error)
    }
}