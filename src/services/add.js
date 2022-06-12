import { createWriteStream } from "fs";

export const add = (filePath) => {
  const writable = createWriteStream(filePath, { flags: "wx" });

  writable.end();

  return new Promise((resolve, reject) => {
    writable.on("error", () => reject());
    writable.on("finish", () => resolve());
  });
};
