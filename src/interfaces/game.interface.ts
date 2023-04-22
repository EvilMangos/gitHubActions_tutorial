import { IMap } from "./map.interface";

export interface IResult {
  map: IMap;
  isWin: boolean;
  isLoose: boolean;
}

export interface IStoreGame {
  map: IMap;
  timer: number;
}
