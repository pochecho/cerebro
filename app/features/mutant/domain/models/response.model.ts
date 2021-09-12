import { Subchain } from "./subchain.model";

export interface Response {
    isMutant: boolean;
    chains: Subchain[];
  }