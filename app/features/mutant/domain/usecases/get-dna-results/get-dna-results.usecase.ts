import { Inject, Injectable } from "@decorators/di";
import { map, Observable, of } from "rxjs";
import { BaseUsecase } from "../../../../../core/domain/usecases/base.usecase";
import { ConsolidatedResponse } from "../../models/consolidated-response.model";
import { MutantService } from "../../../repository/services/mutant.service";
import { MutantGateway } from "../../../repository/contracts/mutant.gateway";

@Injectable()
export class GetDNAResultsUsecase implements BaseUsecase<ConsolidatedResponse> {
  constructor(@Inject(MutantService) private mutantService: MutantGateway) {}
  call(): Observable<ConsolidatedResponse> {
    console.log(this.mutantService);
    return this.mutantService.getDNAResults().pipe(
      map((item) => {
        const human = item.filter((i) => !i.isMutant);
        const mutant = item.filter((i) => i.isMutant);
        return {
          countHumanDNA: human.length,
          countMutantDNA: mutant.length,
          ratio: mutant.length / (human.length > 0 ? human.length : 1),
        } as ConsolidatedResponse;
      })
    );
  }
}
