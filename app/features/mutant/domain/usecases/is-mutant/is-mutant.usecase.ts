import { Inject, Injectable } from "@decorators/di";
import { Observable, of } from "rxjs";
import { BaseUsecase } from "../../../../../core/domain/usecases/base.usecase";
import { Subchain } from "../../models/subchain.model";
import { Position } from "../../models/position.model";
import { Direction } from "../../models/direction.model";
import { Response } from "../../models/response.model";

const DNA_LENGTH = 4;
const MUTANT_SUBCHAINS_LIMIT = 2;

const POSSIBLE_DIRECTIONS: Direction[] = [
  [0, 1], //Move Down
  [1, 1], //Move Down Right
  [1, 0], //Move Right
  [1, -1], //Move Up Right
  [0, -1], //Move Up
  [-1, -1], //Move Up Left
  [-1, 0], //Move Left
  [-1, 1], //Move Down Left
];

@Injectable()
export class IsMutantUsecase implements BaseUsecase<Response> {
  constructor() {}
  call(dnaChain: string[]): Observable<Response> {
    const subChainsResponse: Subchain[] = [];
    for (let i = 0; i < dnaChain.length; i++) {
      const row = dnaChain[i];
      for (let j = 0; j < row.length; j++) {
        const indexPosition: Position = [j, i];
        for (const direction of POSSIBLE_DIRECTIONS) {
          this._(dnaChain, indexPosition, [], [], direction, subChainsResponse);
        }
      }
    }

    return of({
      isMutant: subChainsResponse.length > 1,
      chains: subChainsResponse,
    });
  }

  private _(
    dnaChain: string[],
    position: Position,
    subChainPositions: Position[],
    subChain: string[],
    direction: Direction,
    subChainsResponse: Subchain[]
  ) {
    if (subChainsResponse.length < MUTANT_SUBCHAINS_LIMIT) {
      const currentValue: string = dnaChain[position[1]][position[0]];
      const belongsToChain = this.belongsToChain(subChain, currentValue);
      if (belongsToChain) {
        const newSubchain = [...subChain, currentValue];
        const newPosition = this.getNewPosition(position, direction);
        const newSubchainPositions = [...subChainPositions, position];
        const isAValidPosition = this.isAValidPosition(dnaChain, newPosition);
        if (isAValidPosition) {
          const isSubChainComplete = newSubchain.length === DNA_LENGTH;
          if (!isSubChainComplete) {
            this._(
              dnaChain,
              newPosition,
              newSubchainPositions,
              newSubchain,
              direction,
              subChainsResponse
            );
          } else {
            const subchainResponse = {
              positions: newSubchainPositions,
              chain: newSubchain,
            };
            if (!this.isSubchainPresent(subChainsResponse, subchainResponse)) {
              subChainsResponse.push(subchainResponse);
            }
          }
        }
      }
    }
  }

  private isAValidPosition(dnaChain: string[], position: Position) {
    const x = position[0];
    const y = position[1];
    return x >= 0 && y >= 0 && y < dnaChain.length && x < dnaChain[y].length;
  }

  private getNewPosition(position: Position, direction: Direction): Position {
    return [position[0] + direction[0], position[1] + direction[1]];
  }

  private belongsToChain(subChain: string[], base: string): boolean {
    return subChain.includes(base) || subChain.length === 0;
  }
  private isSubchainPresent(
    subChainsResponse: Subchain[],
    subChainResponse: Subchain
  ) {
    for (const item of subChainsResponse) {
      return String(item.positions) == String(subChainResponse.positions);
    }
    return false;
  }
}
