import { opendir } from "fs/promises";

export const list = async (path) => {
  const dir = await opendir(path);
  const listArray = [];

  for await (const dirent of dir) {
    listArray.push(dirent.name);
  }

  console.dir(listArray.sort((a, b) => a.localeCompare(b)));
};
