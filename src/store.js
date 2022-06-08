import { stdout } from "process";
import { ERROR_INVALID_INPUT } from "./constants";

export class Store {
  username = "";

  constructor(startDirectory) {
    this.currentDirectoty = startDirectory;
  }

  get username() {
    return this.username;
  }

  set username(username) {
    this.username = username;
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
