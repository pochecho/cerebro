import { Observable } from "rxjs";
import { Response } from "../../domain/models/response.model";
import { IHumanModel } from "../../domain/models/human.model";
export abstract class MutantGateway {
  public abstract saveDNAResult(
    dnaChain: string[],
    result: Response
  ): Observable<any>;
  public abstract getDNAResults(): Observable<IHumanModel[]>;
}
