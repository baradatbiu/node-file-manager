import { Store } from "./store.js";
import { parseUsername } from "./utils/parseUsername.js";
import { exit, stdin } from "process";
import { COMMAND_EXIT } from "./constants.js";
import { homedir } from "os";

const store = new Store(homedir);

try {
  const username = parseUsername();
  store.username = username;

  store.writeWelcomeText();
  store.writeDirectory();
} catch (error) {
  store.writeInputError();
  exit();
}

stdin.on("data", (data) => {
  const command = data.toString().trim();

  switch (command) {
    case COMMAND_EXIT:
      store.writeFinishText();
      exit();

    default:
      store.writeInputError();
      break;
  }
});

process.on("SIGINT", () => {
  store.writeFinishText();
  exit();
});
