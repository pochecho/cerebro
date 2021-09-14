import { Inject, Injectable } from "@decorators/di";
import { Response } from "../../domain/models/response.model";
import { IHumanModel } from "../../domain/models/human.model";

import { MutantGateway } from "../contracts/mutant.gateway";
import {
  ScanCommand,
  ScanCommandInput,
  UpdateItemCommand,
  UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DB_CLIENT } from "../../../../configuration/configuration";
import { encrypt } from "../../../../core/helpers/crypto.helpers";
import { from, map, Observable, of } from "rxjs";

@Injectable()
export class MutantService extends MutantGateway {
  constructor(@Inject(DB_CLIENT) private ddbClient: DynamoDBClient) {
    super();
  }
  public saveDNAResult(dnaChain: string[], result: Response): Observable<any> {
    const params: UpdateItemCommandInput = {
      TableName: "dna-results",
      Key: {
        Id: {
          S: encrypt(dnaChain.toString()).content,
        },
      },
      AttributeUpdates: {
        chain: {
          Value: {
            SS: dnaChain,
          },
        },
        mutant: {
          Value: {
            BOOL: result.isMutant,
          },
        },
      },
    };
    const command = new UpdateItemCommand(params);

    return from(this.ddbClient.send(command)).pipe(
      map((resp) => {
        return resp["$metadata"]["httpStatusCode"] === 200;
      })
    );
  }
  public getDNAResults(): Observable<IHumanModel[]> {
    const params: ScanCommandInput = {
      TableName: "dna-results",
    };

    const command = new ScanCommand(params);
    const commandInstance = this.ddbClient.send(command);

    const response = from(commandInstance).pipe(
      map((items) => {
        if (items.Items) {
          const r = items.Items.map((item) => {
            return {
              dna: item.chain.SS,
              isMutant: item.mutant.BOOL,
            } as IHumanModel;
          });
          return r;
        } else {
          return [];
        }
      })
    );

    return response;
  }
}
