import { rename } from "fs/promises";

export const rn = async (filePath, newFilePath) => {
  await rename(filePath, newFilePath);
};
