import { Inject, Injectable } from "@decorators/di";
import {} from "express";
import { Controller, Post, Response, Body, Get } from "@decorators/express";
import { IsMutantUsecase } from "../../domain/usecases/is-mutant/is-mutant.usecase";
import { SaveDNAResultUsecase } from "../../domain/usecases/save-dna-result/save-dna-result.usecase";
import { concat } from "rxjs";
import { GetDNAResultsUsecase } from "../../domain/usecases/get-dna-results/get-dna-results.usecase";

@Controller("/")
@Injectable()
export class MutantsController {
  constructor(
    @Inject(IsMutantUsecase) private isMutantUsecase: IsMutantUsecase,
    @Inject(SaveDNAResultUsecase)
    private saveDNAResultUsecase: SaveDNAResultUsecase,
    @Inject(GetDNAResultsUsecase)
    private getDNAResultsUsecase: GetDNAResultsUsecase
  ) {}

  @Post("/mutants")
  isMutant(@Response() res: any, @Body("dna") dna: string[]) {
    const error = (error) => {
      res.status(500).send(error);
    };

    const $isMutantUsecase = this.isMutantUsecase.call(dna);
    $isMutantUsecase.subscribe({
      next: (response) => {
        const $saveDNAResultUsecase = this.saveDNAResultUsecase.call({
          dnaChain: dna,
          dnaResult: response,
        });
        $saveDNAResultUsecase.subscribe({
          next: (saveData) => {
            if (saveData) {
              if (response.isMutant) {
                res.json(response);
              } else {
                res.status(403).json(response);
              }
            } else {
              res.status(500).send("Could not save the answer");
            }
          },
          error: error,
        });
      },
      error: error,
    });
  }

  @Get("/stats")
  stats(@Response() res: any) {
    const $response = this.getDNAResultsUsecase.call();
    $response.subscribe({
      next: (data) => res.json(data),
      error: (data) => res.status(500).send(data),
    });
  }
}
