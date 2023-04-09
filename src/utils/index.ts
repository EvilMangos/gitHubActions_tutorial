import { ICellCoordinates, IMap } from "../interfaces/map.interface";

export function getCoordinatesOfCellsAround(
  row: number,
  column: number
): ICellCoordinates[] {
  return [
    { row: row - 1, column: column - 1 },
    { row: row - 1, column },
    { row: row - 1, column: column + 1 },
    { row, column: column + 1 },
    { row: row + 1, column: column + 1 },
    { row: row + 1, column },
    { row: row + 1, column: column - 1 },
    { row, column: column - 1 },
  ];
}

export function getCoordinatesOfExistenceCellsAround(
  map: IMap,
  row: number,
  column: number
) {
  const coordinates = getCoordinatesOfCellsAround(row, column);
  return coordinates.filter((value) =>
    isCellExist(map, value.row, value.column)
  );
}

export function isCellExist(map: IMap, row: number, column: number): boolean {
  if (map[column]) {
    if (map[row]) {
      return true;
    }
  }
  return false;
}

export function cloneMap(map: IMap): IMap {
  return map.map((row) => new Array(...row));
}
