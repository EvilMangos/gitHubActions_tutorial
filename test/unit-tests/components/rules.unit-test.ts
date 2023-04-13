import { Rules } from "../../../src/components/rules";
import { cellWithMine, cellWithoutMine } from "../data/cell";
import { notWinMap, winMap } from "../data/map";

describe("Rules class", () => {
  describe("isLoose", () => {
    it("is loose", () => {
      const result = Rules.isLoose(cellWithMine);
      expect(result).toBe(true);
    });
    it("is not loose", () => {
      const result = Rules.isLoose(cellWithoutMine);
      expect(result).toBe(false);
    });
  });

  describe("isWin", () => {
    it("is win", () => {
      const result = Rules.isWin(winMap);
      expect(result).toBe(true);
    });
    it("is not win", () => {
      const result = Rules.isWin(notWinMap);
      expect(result).toBe(false);
    });
  });
});
