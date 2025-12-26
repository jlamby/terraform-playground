import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb"

export type InputDto = {
    id: string
}

export type OutputDto = {
    statusCode: number
    body: string
}

function retrieveDynamoHost(): string {
    console.log('Dynamo endpoint :', process.env.DYNAMODB_ENDPOINT)

    return process.env.DYNAMODB_ENDPOINT
        ? process.env.DYNAMODB_ENDPOINT
        : 'http://localhost:4566' // fallback local
}

const client = new DynamoDBClient({
    region: "us-east-1",
    endpoint: retrieveDynamoHost(),
    credentials: {
        accessKeyId: "test",
        secretAccessKey: "test",
    },
});

export async function handler(event: InputDto): Promise<OutputDto> {
    console.log("Event received:", event);

    const id = event.id;

    if (!id) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "id is required" }),
        };
    }

    await client.send(
        new PutItemCommand({
            TableName: "playground-items",
            Item: {
                id: { S: id },
            },
        })
    )


    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello from TS Lambda!" }),
    };
}

// TODO: remove
if (require.main === module) {
    const event = {
        id : "1"
    }

    handler(event).then(console.log);
}
