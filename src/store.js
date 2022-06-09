import { isAbsolute, join } from "path";
import { chdir, cwd, stdout } from "process";
import { ERROR_INVALID_INPUT, ERROR_OUTPUT } from "./constants.js";
import { list } from "./utils/list.js";

export class Store {
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
    chdir(join(this.currentDirectoty, ".."));
  }

  async changeDirectory(path) {
    const newPath = isAbsolute(path)
      ? join("/", path)
      : join(this.currentDirectoty, path);

    try {
      chdir(newPath);
    } catch (error) {
      this.write(ERROR_OUTPUT);
    }
  }

  async listDirectory() {
    await list(this.currentDirectoty);
    this.write("\n");
  }

  write(message) {
    stdout.write(message);
  }

  writeWelcomeText() {
    this.write(`Welcome to the File Manager, ${this.username}!\n\n`);
  }

  writeFinishText() {
    this.write(`\nThank you for using File Manager, ${this.username}!\n`);
  }

  writeDirectory() {
    this.write(`You are currently in ${this.currentDirectoty}\n\n`);
  }

  writeInputError() {
    this.write(ERROR_INVALID_INPUT);
  }
}
