import { Inject, Injectable } from "@decorators/di";
import { Response } from "../../domain/models/response.model";
// import { Service } from "typedi";
import { MutantGateway } from "../contracts/mutant.gateway";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";
// import {  } from "../../../../configuration/configuration.ts";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DB_CLIENT } from "../../../../configuration/configuration";
// @Service('MutantService')

const params = {
  TableName: "TABLE_NAME", //TABLE_NAME
  Key: {
    KEY_NAME: { N: "KEY_VALUE" },
  },
  ProjectionExpression: "ATTRIBUTE_NAME",
};

@Injectable()
export class MutantService extends MutantGateway {
  constructor(@Inject(DB_CLIENT) private ddbClient: DynamoDBClient) {
    super();
  }
  public saveDNAResult(dnaChain: string[], result: Response): void {
    console.log(result);
    this.ddbClient.send(new GetItemCommand(params)).then((result: any) => {
      console.log("Success", result.Item);
    });
  }
}
