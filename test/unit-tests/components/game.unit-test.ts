import { Game } from "../../../src/components/ game";
import { ICell, IMap } from "../../../src/interfaces/map.interface";

import { ContentCreator } from "../../../src/components/contentCreator";
import { Storage } from "../../../src/components/storage";

import { midGameMap1Move, midGameMap2Move } from "../data/map";

describe("Game class", () => {
  const inputData = {
    size: {
      width: 30,
      height: 16,
    },
    minesCount: 99,
  };
  it("startGame", () => {
    const game = new Game();
    const result = game.startGame(inputData.size, inputData.minesCount);

    const emptyCell: ICell = {
      value: 0,
      isMine: false,
      isOpen: false,
    };
    const expected: IMap = [];

    for (let row = 0; row < inputData.size.height; row++) {
      const emptyRow: ICell[] = [];
      for (let cell = 0; cell < inputData.size.width; cell++) {
        emptyRow.push(structuredClone(emptyCell));
      }
      expected.push(emptyRow);
    }

    expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
  });

  it("doMove", async () => {
    const game = new Game();
    game.startGame(inputData.size, inputData.minesCount);
    ContentCreator.prototype.createContent = jest.fn(() => midGameMap1Move);
    Storage.saveGame = jest.fn();
    const result = await game.doMove({ row: 3, column: 7 }, 10);
    const expected = { isLoose: false, isWin: false, map: midGameMap2Move };

    expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
  });
});
