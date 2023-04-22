import * as fs from "fs";

import { IStoreGame } from "../interfaces/game.interface";
import { IStorage } from "../interfaces/components.interface";

class FileStorage implements IStorage {
  private readonly path: string;

  constructor(path: string) {
    this.path = path;
  }
  async init(): Promise<void> {
    try {
      await fs.promises.open(this.path, "w");
    } catch (err) {
      console.log(err.message);
      process.exit(0);
    }
  }
  async loadGame(): Promise<IStoreGame> {
    const data = await fs.promises.readFile(this.path, {
      encoding: "utf-8",
    });
    return JSON.parse(data.toString());
  }

  async saveGame(game: IStoreGame): Promise<void> {
    await fs.promises.writeFile(this.path, JSON.stringify(game), {
      encoding: "utf-8",
    });
    return;
  }

  async checkNotFinishedGame(): Promise<boolean> {
    return new Promise((resolve) => {
      fs.exists(this.path, function (exists) {
        resolve(exists);
      });
    });
  }

  async deleteGame(): Promise<void> {
    await fs.promises.unlink(this.path);
  }
}

const fileStorage = new FileStorage(
  process.env["DATA_PATH"] || "data/data.txt"
);
fileStorage.init();

export { fileStorage as Storage };
