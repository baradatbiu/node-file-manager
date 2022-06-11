import { createReadStream } from "fs";
const { createHash } = await import("crypto");

export const calculateHash = async (filePath) => {
  const hash = createHash("sha256");
  const readable = createReadStream(filePath);

  return new Promise((resolve, reject) => {
    readable.on("readable", () => {
      const data = readable.read();

      if (data) {
        hash.update(data);
      } else {
        resolve(hash.digest("hex"));
      }
    });

    readable.on("error", () => reject());
  });
};
