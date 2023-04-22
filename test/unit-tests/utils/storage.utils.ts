import * as fs from "fs";
import { IStoreGame } from "../../../src/interfaces/game.interface";

const PATH = process.env["DATA_PATH"] || "data/data.txt";

export async function saveGame(game: IStoreGame) {
  await fs.promises.writeFile(PATH, JSON.stringify(game), {
    encoding: "utf-8",
  });
}

export async function loadGame() {
  const data = await fs.promises.readFile(PATH, {
    encoding: "utf-8",
  });
  return JSON.parse(data.toString());
}

export async function deleteGame() {
  await fs.promises.unlink(PATH);
}
