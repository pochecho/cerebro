import "reflect-metadata";
import { IsMutantUsecase } from "./features/mutant/domain/usecases/is-mutant/is-mutant.usecase";
import { SaveDNAResultUsecase } from "./features/mutant/domain/usecases/save-dna-result/save-dna-result.usecase";
import { Container } from "@decorators/di";

export function handler(dna: any, context, cb) {
  const isMutantUsecase: IsMutantUsecase = Container.get(IsMutantUsecase);
  const saveDNAResultUsecase: SaveDNAResultUsecase =
    Container.get(SaveDNAResultUsecase);

  const error = (error) => {
    const response = {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error }),
    };
    cb(null, error);
  };

  const $isMutantUsecase = isMutantUsecase.call(dna);
  $isMutantUsecase.subscribe({
    next: (isMutantResponse) => {
      const $saveDNAResultUsecase = saveDNAResultUsecase.call({
        dnaChain: dna,
        dnaResult: isMutantResponse,
      });
      $saveDNAResultUsecase.subscribe({
        next: (saveData) => {
          if (saveData["$metadata"]["httpStatusCode"] === 200) {
            if (isMutantResponse.isMutant) {
              const response = {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(isMutantResponse),
              };
              cb(null, response);
            } else {
              const response = {
                statusCode: 403,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(isMutantResponse),
              };
              cb(null, response);
              // res.status(403).json(isMutantResponse);
            }
          } else {
            const response = {
              statusCode: 500,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({}),
            };
            cb(null, response);
            // res.status(500).send("Could not save the answer");
          }
        },
        error: error,
      });
    },
    error: error,
  });
}
