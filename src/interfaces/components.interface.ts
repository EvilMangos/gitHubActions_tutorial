import { ICell, ICellCoordinates, IMap, IResult } from "./map.interface";

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
  doMove(cell: ICellCoordinates): IResult;
}
