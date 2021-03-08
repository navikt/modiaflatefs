const failures = [
    {
        status: 500,
        statusText: 'Internal server error'
    },
    {
        status: 403,
        statusText: 'Forbidden'
    },
    {
        status: 404,
        statusText: 'Not found'
    }
];

export function failurerateMiddleware(probabilityOfFailure) {
    return (request, response) => {
        return new Promise(resolve => {
            const rnd = Math.random();
            if (rnd < probabilityOfFailure) {
                const randomFailure = failures[Math.floor(Math.random() * failures.length)];
                resolve(randomFailure);
            } else {
                resolve(response);
            }
        });
    };
}

export const contentTypeMiddleware = (requestArgs, response) => {
    if (response.headers) {
        return response;
    }
    response.headers = {
        'content-type': 'application/json'
    };
    return response;
};