import { ICell, ICellCoordinates, IMap } from "./map.interface";

export interface IContentCreator {
  createContent(openCellCoordinates: ICellCoordinates): IMap;
}

export interface IRules {
  isLoose(cell: ICell): boolean;
  isWin(map: IMap): boolean;
}
