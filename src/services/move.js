import { unlink } from "fs/promises";
import { copy } from "./copy.js";

export const move = async (filePath, newFilePath) => {
  await copy(filePath, newFilePath);
  await unlink(filePath);
};
