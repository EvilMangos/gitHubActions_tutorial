import { ICell, ICellCoordinates, IMap } from "./map.interface";
import { IResult } from "./game.interface";

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
  doMove(cell: ICellCoordinates, timer: number): Promise<IResult>;
}

export interface IStorage {
  loadGame(): Promise<string>;
  saveGame(data: string): Promise<void>;
  checkNotFinishedGame(): Promise<boolean>;
  deleteGame(): Promise<void>;
}

export interface ICrypto {
  encrypt(data: string): { iv: string; data: string };
  decrypt(encryptedString: string, ivString: string): string;
}
