import { isAbsolute, join } from "path";
import { chdir, cwd, stdout } from "process";
import { ERRORS } from "./constants.js";
import { add } from "./utils/add.js";
import { cat } from "./utils/cat.js";
import { copy } from "./utils/copy.js";
import { remove } from "./utils/remove.js";
import { list } from "./utils/list.js";
import { move } from "./utils/move.js";
import { rn } from "./utils/rename.js";

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
        join(this.currentDirectoty, directory, filePath)
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
        join(this.currentDirectoty, directory, filePath)
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

  write(message) {
    stdout.write(message);
  }

  writeWelcomeText() {
    this.write(`Welcome to the File Manager, ${this.username}!\n\n`);
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
