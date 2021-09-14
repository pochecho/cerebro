import { Container, Injectable } from "@decorators/di";
import { beforeAll } from "@jest/globals";
import { Observable, of } from "rxjs";
import { MutantGateway } from "../../../repository/contracts/mutant.gateway";
import { IHumanModel } from "../../models/human.model";
import { Response } from "../../models/response.model";
import { GetDNAResultsUsecase } from "./get-dna-results.usecase";
import "../../../../../configuration/configuration";
// @Injectable()
class MockGateway extends MutantGateway {
  public saveDNAResult(dnaChain: string[], result: Response): Observable<any> {
    throw new Error("Method not implemented.");
  }
  public getDNAResults(): Observable<IHumanModel[]> {
    return of([
      {
        dna: [""],
        isMutant: true,
      },
      {
        dna: [""],
        isMutant: false,
      },
      {
        dna: [""],
        isMutant: false,
      },
    ] as IHumanModel[]);
  }
}
describe("GetDNAResultsUsecase", () => {
  let usecase: GetDNAResultsUsecase;
  beforeAll(() => {
    usecase = Container.get(GetDNAResultsUsecase);
  });
  it("should create", () => {
    expect(usecase).toBeTruthy();
  });

  it("should return a response with ratio 0.5", (done) => {
    (usecase as any).mutantService = new MockGateway();
    const response = usecase.call();
    response.subscribe((data) => {
      expect(data.ratio).toBe(0.5);
      done();
    });
  });
});
