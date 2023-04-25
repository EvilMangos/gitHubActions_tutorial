import { IMap } from "./map.interface";

export interface IMoveRespond {
  map: IMap;
  isWin: boolean;
  isLoose: boolean;
}

export interface IStoreGame {
  map: IMap;
  timer: number;
}

interface IScore {
  name: string;
  score: number;
}

export type IScores = Array<IScore>;
