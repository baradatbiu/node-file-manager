import { Terminal } from "./terminal.js";
import { parseUsername } from "./utils/parseUsername.js";
import { exit, stdin } from "process";
import { COMMANDS } from "./constants.js";
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
  const [command, propOne, propTwo] = data
    .toString()
    .trim()
    .match(/(?:[^\s"]+|"[^"]*")+/g)
    .map((prop) => prop.replace(/"(.+)"/, "$1"));

  switch (command) {
    case COMMANDS.EXIT:
      terminal.writeFinishText();
      exit();

    case COMMANDS.UP:
      terminal.goUp();
      break;

    case COMMANDS.CD:
      terminal.changeDirectory(propOne);
      break;

    case COMMANDS.LIST:
      terminal.listDirectory();
      break;

    case COMMANDS.CAT:
      terminal.readFile(propOne);
      break;

    case COMMANDS.ADD:
      terminal.addEmptyFile(propOne);
      break;

    case COMMANDS.RN:
      terminal.renameFile(propOne, propTwo);
      break;

    case COMMANDS.CP:
      terminal.copyFile(propOne, propTwo);
      break;

    case COMMANDS.MV:
      terminal.moveFile(propOne, propTwo);
      break;

    case COMMANDS.RM:
      terminal.removeFile(propOne);
      break;

    case COMMANDS.OS:
      terminal.showOsInfo(propOne);
      break;

    case COMMANDS.HASH:
      terminal.showFileHash(propOne);
      break;

    case COMMANDS.COMPRESS:
      terminal.compressFile(propOne, propTwo);
      break;

    case COMMANDS.DECOMPRESS:
      terminal.decompressFile(propOne, propTwo);
      break;

    default:
      terminal.writeInputError();
      break;
  }
});

process.on("SIGINT", () => {
  terminal.writeFinishText();
  exit();
});
