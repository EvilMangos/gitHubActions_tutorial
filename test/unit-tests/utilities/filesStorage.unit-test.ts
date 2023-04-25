import { midGameMap1Move } from "../data/map";
import { deleteGame, loadGame, saveGame } from "../utils/filesStorage.utils";
import { FilesStorage } from "../../../src/utilities/filesStorage";
describe("Storage class", () => {
  const inputData = { map: midGameMap1Move, timer: 12 };

  describe("checkNotFinishedGame", () => {
    it("game exists", async () => {
      await saveGame(JSON.stringify(inputData));
      const result = await FilesStorage.checkExistence();
      expect(result).toBe(true);
      await deleteGame();
    });
    it("game not exists", async () => {
      const result = await FilesStorage.checkExistence();
      expect(result).toBe(false);
    });
  });

  describe("saveGame", () => {
    it("success save game", async () => {
      await FilesStorage.save(JSON.stringify(inputData));
      const result = await loadGame();
      await expect(JSON.stringify(result)).toBe(JSON.stringify(inputData));
    });
  });

  describe("loadGame", () => {
    it("success load game", async () => {
      await saveGame(JSON.stringify(inputData));
      const result = await FilesStorage.load();
      expect(result).toBe(JSON.stringify(inputData));
      await deleteGame();
    });
  });
});
