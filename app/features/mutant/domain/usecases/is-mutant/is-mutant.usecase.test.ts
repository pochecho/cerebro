import { Container } from "@decorators/di";
import { beforeAll } from "@jest/globals";
import { IsMutantUsecase } from "./is-mutant.usecase";
describe("IsMutantUsecase", () => {
  let usecase: IsMutantUsecase;
  beforeAll(() => {
    usecase = Container.get(IsMutantUsecase);
  });
  it("should create", () => {
    expect(usecase).toBeTruthy();
  });

  it("should return true when the dna chain is mutant chain", (done) => {
    const mutantChain = [
      "ATGCGA",
      "CAGTGC",
      "TTATGT",
      "AGAAGG",
      "CCCCTA",
      "TCACTG",
    ];

    let response = usecase.call(mutantChain);
    response
      .subscribe((data) => {
        expect(data.isMutant).toBeTruthy();
        done();
      })
      .unsubscribe();
  });

  it("should return false when the dna chain is mutant chain", (done) => {
    const noMutantChain = [
      "ATGCGA",
      "CGGTAC",
      "TTATGT",
      "AGAAGG",
      "CCCCTA",
      "TCACTG",
    ];

    let response = usecase.call(noMutantChain);
    response
      .subscribe((data) => {
        expect(data.isMutant).toBeFalsy();
        done();
      })
      .unsubscribe();
  });

  it("should return true when the dna chain is mutant chain and the dimensions are bigger", (done) => {
    const noMutantChain = [
      "ATGCGAATGA",
      "CGGTACATAC",
      "TTATGTAAGC",
      "AGAAGGTTGA",
      "CCCCTAATGC",
      "TCACTGAACC",
    ];

    let response = usecase.call(noMutantChain);
    response
      .subscribe((data) => {
        expect(data.isMutant).toBeFalsy();
        done();
      })
      .unsubscribe();
  });
});
