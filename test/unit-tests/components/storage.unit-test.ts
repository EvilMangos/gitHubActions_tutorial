import { Storage } from "../../../src/components/storage";
import { midGameMap1Move } from "../data/map";
import { deleteGame, loadGame, saveGame } from "../utils/storage.utils";
describe("Storage class", () => {
  const inputData = { map: midGameMap1Move, timer: 12 };

  describe("checkNotFinishedGame", () => {
    it("game exists", async () => {
      await saveGame(inputData);
      const result = await Storage.checkNotFinishedGame();
      expect(result).toBe(true);
      await deleteGame();
    });
    it("game not exists", async () => {
      const result = await Storage.checkNotFinishedGame();
      expect(result).toBe(false);
    });
  });

  it("saveGame", async () => {
    await Storage.saveGame(inputData);
    const result = await loadGame();
    await expect(JSON.stringify(result)).toBe(JSON.stringify(inputData));
  });

  describe("loadGame", () => {
    it("success load game", async () => {
      await saveGame(inputData);
      const result = await Storage.loadGame();
      expect(JSON.stringify(result)).toBe(JSON.stringify(inputData));
      await deleteGame();
    });
  });
});
