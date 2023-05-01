import { ICellCoordinates, IMap, ISize } from "./map.interface";

export interface IContentCreatorUtilities {
  getEmptyMap(size: ISize): IMap;
  getMinesPositions(
    size: ISize,
    minesCount: number,
    openCellCoordinates: ICellCoordinates
  ): number[];
  getMapFilledByMines(map: IMap, minesPositions: number[]): IMap;
  getMapFilledByNumbers(map: IMap): IMap;
}

export interface IStorageUtilities {
  load(path: string): Promise<string>;
  save(path: string, data: string): Promise<void>;
  checkExistence(path: string): Promise<boolean>;
  delete(path: string): Promise<void>;
}
