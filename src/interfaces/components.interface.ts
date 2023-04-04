import { ICell, IMap, ISize } from "./map.interface";

export interface IContentCreator {
  createContent(size: ISize, openCell: ICell): IMap;
}
