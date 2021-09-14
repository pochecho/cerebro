import "reflect-metadata";
import { GetDNAResultsUsecase } from "./features/mutant/domain/usecases/get-dna-results/get-dna-results.usecase";
import { Container } from "@decorators/di";

export function handler(dna: any, context, cb) {
  const getDNAResultsUsecase: GetDNAResultsUsecase =
    Container.get(GetDNAResultsUsecase);

  const $response = getDNAResultsUsecase.call();
  $response.subscribe({
    next: (data) => {
      const response = {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      cb(null, response);
    },
    error: (error) => {
      const response = {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(error),
      };
      cb(null, response);
    },
  });
}
