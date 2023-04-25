import * as fs from "fs";

const PATH = process.env["DATA_PATH"] || "data/data.txt";

export async function saveGame(data: string) {
  await fs.promises.writeFile(PATH, data, {
    encoding: "utf-8",
  });
}

export async function loadGame() {
  const data = await fs.promises.readFile(PATH, {
    encoding: "utf-8",
  });
  return JSON.parse(data);
}

export async function deleteGame() {
  await fs.promises.unlink(PATH);
}
