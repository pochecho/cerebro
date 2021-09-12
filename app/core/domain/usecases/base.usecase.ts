import { Observable } from "rxjs";

export interface BaseUsecase<T> {
  call(param: any): Observable<T>;
}
