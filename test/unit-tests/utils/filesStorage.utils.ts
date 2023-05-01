import * as fs from "fs";

export async function saveData(path: string, data: string) {
  await fs.promises.writeFile(path, data, {
    encoding: "utf-8",
  });
}

export async function loadData(path: string) {
  const data = await fs.promises.readFile(path, {
    encoding: "utf-8",
  });
  return JSON.parse(data);
}

export async function deleteData(path: string) {
  await fs.promises.truncate(path);
}
