import { ICellCoordinates, IMap } from "./map.interface";

export interface IContentCreator {
  createContent(openCellCoordinates: ICellCoordinates): IMap;
}
