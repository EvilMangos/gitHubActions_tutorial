import { ICell, ICellCoordinates, IMap } from "./map.interface";
import { IResult, IStoreGame } from "./game.interface";

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
  loadGame(): Promise<IStoreGame>;
  saveGame(game: IStoreGame): Promise<void>;
  checkNotFinishedGame(): Promise<boolean>;
  deleteGame(): Promise<void>;
}
