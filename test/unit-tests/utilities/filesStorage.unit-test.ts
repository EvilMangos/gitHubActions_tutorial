import { midGameMap1Move } from "../data/map";
import { deleteData, loadData, saveData } from "../utils/filesStorage.utils";
import { FilesStorage } from "../../../src/utilities/filesStorage";
import { cleanUp } from "../cleanTestData";

const gamePath = process.env["GAME_DATA_PATH"] || "";
const scoresPath = process.env["SCORES_DATA_PATH"] || "";

beforeAll(async () => {
  await FilesStorage.init(gamePath, scoresPath);
});

afterEach(async () => {
  await deleteData(gamePath);
  await deleteData(scoresPath);
});

describe("Storage class", () => {
  const inputData = { map: midGameMap1Move, timer: 12 };

  describe("checkExistence", () => {
    it("game exists", async () => {
      await saveData(gamePath, JSON.stringify(inputData));
      const result = await FilesStorage.checkExistence(gamePath);
      expect(result).toBe(true);
    });
    it("game not exists", async () => {
      const result = await FilesStorage.checkExistence(gamePath);
      expect(result).toBe(false);
    });
  });

  describe("save", () => {
    it("success save game", async () => {
      await FilesStorage.save(gamePath, JSON.stringify(inputData));
      const result = await loadData(gamePath);
      await expect(JSON.stringify(result)).toBe(JSON.stringify(inputData));
    });

    it("success save score", async () => {
      await FilesStorage.save(scoresPath, JSON.stringify(inputData));
      const result = await loadData(scoresPath);
      await expect(JSON.stringify(result)).toBe(JSON.stringify(inputData));
    });
  });

  describe("load", () => {
    it("success load game", async () => {
      await saveData(gamePath, JSON.stringify(inputData));
      const result = await FilesStorage.load(gamePath);
      expect(result).toBe(JSON.stringify(inputData));
    });

    it("success load scores", async () => {
      await saveData(scoresPath, JSON.stringify(inputData));
      const result = await FilesStorage.load(scoresPath);
      expect(result).toBe(JSON.stringify(inputData));
    });
  });
});

afterAll(async () => {
  await cleanUp();
});
