import { Container } from "@decorators/di";
import { beforeAll } from "@jest/globals";
import { SaveDNAResultUsecase } from "../save-dna-result/save-dna-result.usecase";
describe("IsMutantUsecase", () => {
  let usecase: SaveDNAResultUsecase;
  beforeAll(() => {
    usecase = Container.get(SaveDNAResultUsecase);
  });
  it("should create", () => {
    expect(usecase).toBeTruthy();
  });
});
