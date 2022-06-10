import { Terminal } from "./terminal.js";
import { parseUsername } from "./utils/parseUsername.js";
import { exit, stdin } from "process";
import {
  COMMAND_CD,
  COMMAND_EXIT,
  COMMAND_LIST,
  COMMAND_UP,
} from "./constants.js";
import { homedir } from "os";

const store = new Terminal(homedir());

try {
  const username = parseUsername();
  store.username = username;

  store.writeWelcomeText();
} catch (error) {
  store.writeInputError();
  exit();
}

stdin.on("data", (data) => {
  const [command, prop = ""] = data.toString().trim().split(" ");

  switch (command) {
    case COMMAND_EXIT:
      store.writeFinishText();
      exit();

    case COMMAND_UP:
      store.goUp();
      break;

    case COMMAND_CD:
      store.changeDirectory(prop);
      break;

    case COMMAND_LIST:
      store.listDirectory();
      break;

    default:
      store.writeInputError();
      break;
  }
});

process.on("SIGINT", () => {
  store.writeFinishText();
  exit();
});
