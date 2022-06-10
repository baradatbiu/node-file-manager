import { createReadStream } from "fs";

export const cat = (filePath) => {
  return new Promise((resolve, reject) => {
    const chunks = [];

    const readable = createReadStream(filePath);

    readable.on("readable", () => {
      let chunk;

      while (null !== (chunk = readable.read())) {
        chunks.push(chunk);
      }
    });

    readable.on("error", () => reject());

    readable.on("end", () => resolve(chunks.join("")));
  });
};
