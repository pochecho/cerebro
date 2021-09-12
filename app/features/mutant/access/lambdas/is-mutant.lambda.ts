import "reflect-metadata";
import { IsMutantUsecase } from "../../domain/usecases/is-mutant/is-mutant.usecase";
import { Container } from "@decorators/di";

export function handler(event: any, context, cb) {
  const usecases: IsMutantUsecase = Container.get(IsMutantUsecase);

  usecases
    .call(event)
    .subscribe((data) => {
      console.log(data);
      cb(null, data);
    })
    .unsubscribe();
}
