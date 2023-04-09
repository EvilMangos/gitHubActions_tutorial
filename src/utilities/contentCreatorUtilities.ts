import {
  ICell,
  ICellCoordinates,
  IMap,
  ISize,
} from "../interfaces/map.interface";
import { IContentCreatorUtilities } from "../interfaces/utilities.interface";
import {
  cloneMap,
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
        emptyRow.push(emptyCell);
      }
      map.push(emptyRow);
    }
    return map;
  }
  getMinesPositions(
    size: ISize,
    minesCount: number,
    openCellCoordinates: ICellCoordinates
  ): number[] {
    const cellsCount = size.width * size.height;
    const arrayWithRandomNumbers = this.getArrayWithRandomNumbers(cellsCount);
    const positionsOfUnallowedCells = this.getPositionsOfUnallowedCells(
      openCellCoordinates,
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

  getPositionsOfUnallowedCells(
    openCellCoordinates: ICellCoordinates,
    size: ISize
  ) {
    const unallowedCells = getCoordinatesOfCellsAround(
      openCellCoordinates.row,
      openCellCoordinates.column
    );
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
    const clonedMap = cloneMap(map);
    let count = 0;
    return clonedMap.map((row) => {
      return row.map((cell) => {
        if (minesPositions.includes(count)) {
          cell.isMine = true;
        }
        count++;
        return cell;
      });
    });
  }

  getMapFilledByNumbers(map: IMap): IMap {
    const clonedMap = cloneMap(map);
    for (let row = 0; row < clonedMap.length; row++) {
      for (let column = 0; column < clonedMap[row].length; column++) {
        if (clonedMap[row][column].isMine) {
          this.increaseValueOfCellsAround(map, row, column);
        }
      }
    }
    return clonedMap;
  }

  increaseValueOfCellsAround(map: IMap, row: number, column: number): void {
    const coordinatesOfCellsAround = getCoordinatesOfExistenceCellsAround(
      map,
      row,
      column
    );
    coordinatesOfCellsAround.forEach((coordinates) =>
      this.increaseCellValue(map, coordinates.row, coordinates.column)
    );
  }

  increaseCellValue(map: IMap, row: number, column: number): void {
    map[row][column].value++;
  }
}
