import * as fs from "fs";

export const cleanUp = async () => {
  await fs.promises.unlink(process.env["SCORES_DATA_PATH"] || "");
  await fs.promises.unlink(process.env["GAME_DATA_PATH"] || "");
};
