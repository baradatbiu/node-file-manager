import { unlink } from "fs/promises";

export const remove = async (filePath) => {
  await unlink(filePath);
};
