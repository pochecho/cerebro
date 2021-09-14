import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Container, InjectionToken } from "@decorators/di";
const REGION = "us-east-1";

const ddbClient = new DynamoDBClient({
  region: REGION,
  credentials: {
    accessKeyId: "AKIA3OHRIFT3FHBVHBWW",
    secretAccessKey: "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",
  },
});

export const DB_CLIENT = new InjectionToken("DB_CLIENT");

Container.provide([
  {
    provide: DB_CLIENT,
    useValue: ddbClient,
  },
]);
