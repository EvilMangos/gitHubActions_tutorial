import {
  ICell,
  ICellCoordinates,
  IMap,
  ISize,
} from "../interfaces/map.interface";
import { IContentCreatorUtilities } from "../interfaces/utilities.interface";
import {
  getCoordinatesOfCellsAround,
  getCoordinatesOfExistenceCellsAround,
} from "../utils";

const emptyCell: ICell = {
  value: 0,
  isMine: false,
  isOpen: false,
};

export class ContentCreatorUtilities implements IContentCreatorUtilities {
  getEmptyMap(size: ISize): IMap {
    const map: IMap = [];
    for (let row = 0; row < size.height; row++) {
      const emptyRow: ICell[] = [];
      for (let cell = 0; cell < size.width; cell++) {
        emptyRow.push(structuredClone(emptyCell));
      }
      map.push(emptyRow);
    }
    return map;
  }
  getMinesPositions(
    size: ISize,
    minesCount: number,
    cellCoordinates: ICellCoordinates
  ): number[] {
    const cellsCount = size.width * size.height;
    const arrayWithRandomNumbers = this.getArrayWithRandomNumbers(cellsCount);
    const positionsOfUnallowedCells = this.getPositionsOfUnallowedCells(
      cellCoordinates,
      size
    );
    const updatedArrayWithRandomNumbers = arrayWithRandomNumbers.map(
      (value, index) => (positionsOfUnallowedCells.includes(index) ? 0 : value)
    );
    const sortedFieldCellsRow: number[] = new Array(
      ...updatedArrayWithRandomNumbers
    ).sort((a, b) => b - a);
    const mines = sortedFieldCellsRow.slice(0, minesCount);
    return mines.map((value) => arrayWithRandomNumbers.indexOf(value));
  }

  getArrayWithRandomNumbers(length: number): number[] {
    let array = new Array(length).fill(null);
    array = array.map(() => Math.random());
    return array;
  }

  getPositionsOfUnallowedCells(cellCoordinates: ICellCoordinates, size: ISize) {
    const unallowedCells = getCoordinatesOfCellsAround(cellCoordinates);
    const existenceUnallowedCells = unallowedCells.filter(
      (value) =>
        value.column > 0 &&
        value.column < size.width &&
        value.row > 0 &&
        value.row < size.height
    );
    return existenceUnallowedCells.map((value) => value.row * value.column);
  }

  getMapFilledByMines(map: IMap, minesPositions: number[]): IMap {
    const clonedMap = structuredClone(map);
    let count = 0;
    return clonedMap.map((row) =>
      row.map((cell) => {
        if (minesPositions.includes(count)) {
          cell.isMine = true;
        }
        count++;
        return cell;
      })
    );
  }

  getMapFilledByNumbers(map: IMap): IMap {
    const clonedMap = structuredClone(map);
    clonedMap.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        if (cell.isMine) {
          this.increaseValueOfCellsAround(clonedMap, {
            row: rowIndex,
            column: columnIndex,
          });
        }
      });
    });

    return clonedMap;
  }

  increaseValueOfCellsAround(
    map: IMap,
    cellCoordinates: ICellCoordinates
  ): void {
    const coordinatesOfCellsAround = getCoordinatesOfExistenceCellsAround(
      map,
      cellCoordinates
    );
    coordinatesOfCellsAround.forEach((coordinates) =>
      this.increaseCellValue(map, coordinates)
    );
  }

  increaseCellValue(map: IMap, cellCoordinates: ICellCoordinates): void {
    if (!map[cellCoordinates.row][cellCoordinates.column].isMine)
      map[cellCoordinates.row][cellCoordinates.column].value++;
  }
}
