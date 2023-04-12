import { ICellCoordinates, IMap } from "../interfaces/map.interface";

export function getCoordinatesOfCellsAround(
  cellCoordinates: ICellCoordinates
): ICellCoordinates[] {
  return [
    { row: cellCoordinates.row - 1, column: cellCoordinates.column - 1 },
    { row: cellCoordinates.row - 1, column: cellCoordinates.column },
    { row: cellCoordinates.row - 1, column: cellCoordinates.column + 1 },
    { row: cellCoordinates.row, column: cellCoordinates.column + 1 },
    { row: cellCoordinates.row + 1, column: cellCoordinates.column + 1 },
    { row: cellCoordinates.row + 1, column: cellCoordinates.column },
    { row: cellCoordinates.row + 1, column: cellCoordinates.column - 1 },
    { row: cellCoordinates.row, column: cellCoordinates.column - 1 },
  ];
}

export function isCellExist(map: IMap, row: number, column: number): boolean {
  if (map[row]) {
    if (map[row][column]) {
      return true;
    }
  }
  return false;
}

export function getCoordinatesOfExistenceCellsAround(
  map: IMap,
  cellCoordinates: ICellCoordinates
) {
  const coordinates = getCoordinatesOfCellsAround(cellCoordinates);
  return coordinates.filter((value) =>
    isCellExist(map, value.row, value.column)
  );
}
