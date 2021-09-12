import { Injectable } from "@decorators/di";
import { Response } from "../../domain/models/response.model";
// import { Service } from "typedi";

// @Service('MutantGateway')
// @Injectable()
export abstract class MutantGateway {
  public abstract saveDNAResult(dnaChain: string[], result: Response): void;
}
