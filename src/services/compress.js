import { createBrotliCompress } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";

export const compress = async (srcFilePath, destFilePath) => {
  const readable = createReadStream(srcFilePath);
  const writable = createWriteStream(`${destFilePath}.br`);
  const brotli = createBrotliCompress();

  await pipeline(readable, brotli, writable);
};
