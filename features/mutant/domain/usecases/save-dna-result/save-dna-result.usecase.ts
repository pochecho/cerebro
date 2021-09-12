import { Inject, Injectable } from "@decorators/di";
import { Observable, of } from "rxjs";
import { BaseUsecase } from "../../../../../core/domain/usecases/base.usecase";
import { Response } from "../../models/response.model";
import { MutantService } from "../../../repository/services/mutant.service";

@Injectable()
export class SaveDNAResultUsecase implements BaseUsecase<any> {
  constructor(@Inject(MutantService) private mutantService: MutantService) {}
  call(data: { dnaChain: string[]; dnaResult: Response }): Observable<any> {
    this.mutantService.saveDNAResult(data.dnaChain,data.dnaResult);
    return of(null);
  }
}
