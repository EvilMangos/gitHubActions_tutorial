import fs from "fs";

import { IStorageUtilities } from "../interfaces/utilities.interface";

class FilesStorage implements IStorageUtilities {
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
  async load(): Promise<string> {
    return fs.promises.readFile(this.path, {
      encoding: "utf-8",
    });
  }

  async save(data: string): Promise<void> {
    await fs.promises.writeFile(this.path, data, {
      encoding: "utf-8",
    });
    return;
  }

  async checkExistence(): Promise<boolean> {
    return new Promise((resolve) => {
      fs.exists(this.path, function (exists) {
        resolve(exists);
      });
    });
  }

  async delete(): Promise<void> {
    await fs.promises.unlink(this.path);
  }
}

const filesStorage = new FilesStorage(
  process.env["DATA_PATH"] || "data/data.txt"
);

export { filesStorage as FilesStorage };
