import { Container } from "@decorators/di";
import { beforeAll } from "@jest/globals";
import { GetDNAResultsUsecase } from "./get-dna-results.usecase";
describe("GetDNAResultsUsecase", () => {
  let usecase: GetDNAResultsUsecase;
  beforeAll(() => {
    usecase = Container.get(GetDNAResultsUsecase);
  });
  it("should create", () => {
    expect(usecase).toBeTruthy();
  });
});
