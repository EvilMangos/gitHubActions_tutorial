import { ContentCreator } from "../../../src/components/contentCreator";
import { getCoordinatesOfExistenceCellsAround } from "../../../src/utils";

describe("ContentCreator class", () => {
  const inputData = {
    size: {
      width: 30,
      height: 16,
    },
    minesCount: 99,
  };

  const contentCreator = new ContentCreator(
    inputData.size,
    inputData.minesCount
  );

  const map = contentCreator.createContent({ row: 0, column: 0 });

  it("createContent correct map size", () => {
    const height = map.length;
    const width = map[0].length;

    expect(width).toBe(inputData.size.width);
    expect(height).toBe(inputData.size.height);
  });

  it("createContent correct mines count", () => {
    let count = 0;

    map.forEach((row) => {
      row.forEach((cell) => {
        if (cell.isMine) count++;
      });
    });

    expect(count).toBe(inputData.minesCount);
  });

  it("createContent correct values", () => {
    const result: number[][] = [];

    map.forEach((row, rowIndex) => {
      result.push([]);

      row.forEach((cell, columnIndex) => {
        if (!cell.isMine) {
          const coordinates = getCoordinatesOfExistenceCellsAround(
            map,
            rowIndex,
            columnIndex
          );

          let value = 0;
          coordinates.forEach((coordinate) => {
            if (map[coordinate.row][coordinate.column].isMine) {
              value++;
            }
          });
          result[rowIndex].push(value);
        } else result[rowIndex].push(0);
      });
    });

    const expected = map.map((row) => row.map((cell) => cell.value));
    expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
  });
});
