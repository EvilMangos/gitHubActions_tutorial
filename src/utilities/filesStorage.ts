import fs from "fs";

import { IStorageUtilities } from "../interfaces/utilities.interface";

class FilesStorage implements IStorageUtilities {
  async init(pathGame: string, pathScores: string): Promise<void> {
    try {
      await fs.promises.open(pathGame, "w");
      await fs.promises.open(pathScores, "w");
    } catch (err) {
      console.log(err.message);
      process.exit(0);
    }
  }
  async load(path: string): Promise<string> {
    return fs.promises.readFile(path, {
      encoding: "utf-8",
    });
  }

  async save(path: string, data: string): Promise<void> {
    await fs.promises.writeFile(path, data, {
      encoding: "utf-8",
    });
    return;
  }

  async checkExistence(path: string): Promise<boolean> {
    const data = await fs.promises.readFile(path, {
      encoding: "utf-8",
    });
    return !!data;
  }

  async delete(path: string): Promise<void> {
    await fs.promises.truncate(path);
  }
}

const filesStorage = new FilesStorage();

export { filesStorage as FilesStorage };
