import { ICell, ICellCoordinates, IMap, ISize } from "./map.interface";
import { IMoveRespond, IScore, IScores, IStoreGame } from "./game.interface";

export interface IContentCreator {
  createContent(openCellCoordinates: ICellCoordinates): IMap;
  getEmptyMap(): IMap;
}

export interface IRules {
  isLoose(cell: ICell): boolean;
  isWin(map: IMap): boolean;
}

export interface IMapService {
  openArea(cell: ICellCoordinates): IMap;
  getCell(cellCoordinates: ICellCoordinates): ICell;
}

export interface IGame {
  startGame(size: ISize, minesCount: number): IMap;
  doMove(cell: ICellCoordinates, timer: number): Promise<IMoveRespond>;
}

export interface IStorage {
  loadGame(): Promise<IStoreGame>;
  saveGame(data: IStoreGame): Promise<void>;
  checkNotFinishedGame(): Promise<boolean>;
  deleteGame(): Promise<void>;
  loadScores(): Promise<IScores>;
  saveScore(data: IScore): Promise<void>;
}

export interface ICrypto {
  encrypt(data: string): { iv: string; data: string };
  decrypt(encryptedString: string, ivString: string): string;
}
