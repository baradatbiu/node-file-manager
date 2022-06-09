import { Store } from "./store.js";
import { parseUsername } from "./utils/parseUsername.js";
import { exit, stdin } from "process";
import {
  COMMAND_CD,
  COMMAND_EXIT,
  COMMAND_LIST,
  COMMAND_UP,
} from "./constants.js";
import { homedir } from "os";

const store = new Store(homedir());

try {
  const username = parseUsername();
  store.username = username;

  store.writeWelcomeText();
  store.writeDirectory();
} catch (error) {
  store.writeInputError();
  exit();
}

stdin.on("data", async (data) => {
  const [command, prop = ""] = data.toString().trim().split(" ");
  // console.log(data.toString().trim().split(" "));
  switch (command) {
    case COMMAND_EXIT:
      store.writeFinishText();
      exit();

    case COMMAND_UP:
      store.goUp();
      store.writeDirectory();
      break;

    case COMMAND_CD:
      store.changeDirectory(prop);
      store.writeDirectory();
      break;

    case COMMAND_LIST:
      await store.listDirectory();
      store.writeDirectory();
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
