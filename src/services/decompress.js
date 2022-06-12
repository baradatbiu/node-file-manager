import { createBrotliDecompress } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";

export const decompress = async (srcFilePath, destFilePath) => {
  const readable = createReadStream(srcFilePath);
  const writable = createWriteStream(destFilePath.replace(/\.br$/, ""));
  const brotli = createBrotliDecompress();

  await pipeline(readable, brotli, writable);
};
