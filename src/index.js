import { Terminal } from "./terminal.js";
import { parseUsername } from "./services/parseUsername.js";
import { commandHandler } from "./commandHandler.js";
import { exit, stdin } from "process";
import { homedir } from "os";

const terminal = new Terminal(homedir());

try {
  const username = parseUsername();
  terminal.username = username;

  terminal.writeWelcomeText();
} catch (error) {
  terminal.writeInputError();
  exit();
}

stdin.on("data", (data) => {
  commandHandler(terminal, data);
});

process.on("SIGINT", () => {
  terminal.writeFinishText();
  exit();
});
