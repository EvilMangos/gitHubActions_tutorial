import { ICell, IMap, ISize } from "../interfaces/map.interface";

const emptyCell: ICell = {
  value: 0,
  isMine: false,
  isOpen: false,
};

export class ContentCreatorUtilities {
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
  getMinesPositions(size: ISize, minesCount: number): number[] {
    const cellsCount = size.width * size.height;
    const arrayWithRandomNumbers = this.getArrayWithRandomNumbers(cellsCount);
    const sortedFieldCellsRow: number[] = new Array(
      ...arrayWithRandomNumbers
    ).sort((a, b) => b - a);
    const mines = sortedFieldCellsRow.slice(0, minesCount);
    return mines.map((value) => arrayWithRandomNumbers.indexOf(value));
  }

  getArrayWithRandomNumbers(length: number): number[] {
    let array = new Array(length).fill(null);
    array = array.map(() => Math.random());
    return array;
  }

  getMapFilledByMines(map: IMap, minesPositions: number[]): IMap {
    const clonedMap = this.cloneMap(map);
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
    const clonedMap = this.cloneMap(map);
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
    const coordinatesOfCellsAround = [
      { row: row - 1, column: column - 1 },
      { row: row - 1, column },
      { row: row - 1, column: column + 1 },
      { row, column: column + 1 },
      { row: row + 1, column: column + 1 },
      { row: row + 1, column },
      { row: row + 1, column: column - 1 },
      { row, column: column - 1 },
    ];
    coordinatesOfCellsAround.forEach((coordinates) =>
      this.increaseCellValue(map, coordinates.row, coordinates.column)
    );
  }

  increaseCellValue(map: IMap, column: number, row: number): void {
    if (this.isCellExist(map, column, row)) {
      map[row][column].value++;
    }
  }
  isCellExist(map: IMap, column: number, row: number): boolean {
    if (map[column]) {
      if (map[row]) {
        return true;
      }
    }
    return false;
  }

  cloneMap(map: IMap): IMap {
    return map.map((row) => new Array(...row));
  }
}
