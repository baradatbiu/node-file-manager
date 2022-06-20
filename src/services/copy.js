import { createReadStream, createWriteStream } from "fs";

export const copy = (filePath, newFilePath) => {
  const readable = createReadStream(filePath);
  const writable = createWriteStream(newFilePath, { flags: "wx" });

  readable.pipe(writable);

  return new Promise((resolve, reject) => {
    readable.on("error", () => reject());
    writable.on("error", () => reject());
    writable.on("finish", () => resolve());
  });
};
