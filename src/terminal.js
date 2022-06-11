import { isAbsolute, join, parse } from "path";
import { chdir, cwd, stdout } from "process";
import { ERRORS } from "./constants.js";
import { add } from "./utils/add.js";
import { cat } from "./utils/cat.js";
import { copy } from "./utils/copy.js";
import { remove } from "./utils/remove.js";
import { list } from "./utils/list.js";
import { move } from "./utils/move.js";
import { rn } from "./utils/rename.js";
import { getOsInfo } from "./utils/getOsInfo.js";
import { calculateHash } from "./utils/calcHash.js";
import { compress } from "./utils/compress.js";
import { decompress } from "./utils/decompress.js";

export class Terminal {
  username = "";

  constructor(startDirectory) {
    chdir(startDirectory);
  }

  get username() {
    return this.username;
  }

  set username(username) {
    this.username = username;
  }

  get currentDirectoty() {
    return cwd();
  }

  getFileNameFromPath(filePath) {
    return parse(filePath).base;
  }

  goUp() {
    try {
      chdir(join(this.currentDirectoty, ".."));

      this.writeDirectory();
    } catch (error) {
      this.write(ERRORS.OUTPUT);
    }
  }

  changeDirectory(path) {
    const newPath = isAbsolute(path)
      ? join("/", path)
      : join(this.currentDirectoty, path);

    try {
      chdir(newPath);

      this.writeDirectory();
    } catch (error) {
      this.write(ERRORS.OUTPUT);
    }
  }

  async listDirectory() {
    try {
      await list(this.currentDirectoty);

      this.writeDirectory();
    } catch (error) {
      this.write(ERRORS.OUTPUT);
    }
  }

  async readFile(filePath) {
    try {
      const content = await cat(join(this.currentDirectoty, filePath));

      this.write(content);
      this.writeDirectory();
    } catch (error) {
      this.write(ERRORS.OUTPUT);
    }
  }

  async addEmptyFile(fileName) {
    try {
      await add(join(this.currentDirectoty, fileName));

      this.writeDirectory();
    } catch (error) {
      this.write(ERRORS.OUTPUT);
    }
  }

  async renameFile(filePath, newFileName) {
    try {
      await rn(
        join(this.currentDirectoty, filePath),
        join(this.currentDirectoty, newFileName)
      );

      this.writeDirectory();
    } catch (error) {
      this.write(ERRORS.OUTPUT);
    }
  }

  async copyFile(filePath, directory) {
    try {
      await copy(
        join(this.currentDirectoty, filePath),
        join(
          this.currentDirectoty,
          directory,
          this.getFileNameFromPath(filePath)
        )
      );

      this.writeDirectory();
    } catch (error) {
      this.write(ERRORS.OUTPUT);
    }
  }

  async moveFile(filePath, directory) {
    try {
      await move(
        join(this.currentDirectoty, filePath),
        join(
          this.currentDirectoty,
          directory,
          this.getFileNameFromPath(filePath)
        )
      );

      this.writeDirectory();
    } catch (error) {
      this.write(ERRORS.OUTPUT);
    }
  }

  async removeFile(filePath) {
    try {
      await remove(join(this.currentDirectoty, filePath));

      this.writeDirectory();
    } catch (error) {
      this.write(ERRORS.OUTPUT);
    }
  }

  async showOsInfo(prop) {
    const regex = new RegExp(/^--/);

    try {
      if (!regex.test(prop)) throw new Error();

      const osInfoKey = prop.replace(regex, "");

      const info = await getOsInfo(osInfoKey);

      console.log(info);
      this.writeDirectory();
    } catch (error) {
      this.write(ERRORS.OUTPUT);
    }
  }

  async showFileHash(filePath) {
    try {
      const hash = await calculateHash(join(this.currentDirectoty, filePath));

      this.write(`\n${hash}\n`);
      this.writeDirectory();
    } catch (error) {
      this.write(ERRORS.OUTPUT);
    }
  }

  async compressFile(filePath, destination) {
    try {
      await compress(
        join(this.currentDirectoty, filePath),
        join(
          this.currentDirectoty,
          destination,
          this.getFileNameFromPath(filePath)
        )
      );

      this.writeDirectory();
    } catch (error) {
      this.write(ERRORS.OUTPUT);
    }
  }

  async decompressFile(filePath, destination) {
    try {
      await decompress(
        join(this.currentDirectoty, filePath),
        join(
          this.currentDirectoty,
          destination,
          this.getFileNameFromPath(filePath)
        )
      );

      this.writeDirectory();
    } catch (error) {
      this.write(ERRORS.OUTPUT);
    }
  }

  write(message) {
    stdout.write(message);
  }

  writeWelcomeText() {
    this.write(`Welcome to the File Manager, ${this.username}!\n`);
    this.writeDirectory();
  }

  writeFinishText() {
    this.write(`\nThank you for using File Manager, ${this.username}!\n`);
  }

  writeDirectory() {
    this.write(`\nYou are currently in ${this.currentDirectoty}\n\n`);
  }

  writeInputError() {
    this.write(ERRORS.INVALID_INPUT);
  }
}
