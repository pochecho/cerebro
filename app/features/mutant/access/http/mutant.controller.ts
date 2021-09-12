import { Inject, Injectable } from "@decorators/di";
import {} from "express";
import { Controller, Post, Response, Body } from "@decorators/express";
import { IsMutantUsecase } from "../../domain/usecases/is-mutant/is-mutant.usecase";
import { SaveDNAResultUsecase } from "../../domain/usecases/save-dna-result/save-dna-result.usecase";

@Controller("/mutants")
@Injectable()
export class MutantsController {
  constructor(
    @Inject(IsMutantUsecase) private isMutantUsecase: IsMutantUsecase,
    @Inject(SaveDNAResultUsecase)
    private saveDNAResultUsecase: SaveDNAResultUsecase
  ) {}

  @Post("/")
  isMutant(@Response() res: any, @Body("dna") dna: string[]) {
    const response = this.isMutantUsecase.call(dna);
    response
      .subscribe({
        next: (data) => {
          const insideResponse = this.saveDNAResultUsecase.call({
            dnaChain: dna,
            dnaResult: data,
          });
          insideResponse
            .subscribe(() => {
              if (data.isMutant) {
                res.json(data);
              } else {
                res.status(403).json(data);
              }
            })
            .unsubscribe();
        },
        error: (error) => {
          res.status(500).send(error);
        },
      })
      .unsubscribe();
  }
}
