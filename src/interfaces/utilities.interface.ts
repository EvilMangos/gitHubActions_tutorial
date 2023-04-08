import { IMap, ISize } from "./map.interface";

export interface IContentCreatorUtilities {
  getEmptyMap(size: ISize): IMap;
  getMinesPositions(size: ISize, minesCount: number): number[];
  getMapFilledByMines(map: IMap, minesPositions: number[]): IMap;
  getMapFilledByNumbers(map: IMap): IMap;
}
