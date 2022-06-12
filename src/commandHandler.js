import { COMMANDS, OS_PROPS } from "./constants";

export const commandHandler = (terminal, data) => {
  const [command, ...props] = data
    .toString()
    .trim()
    .match(/(?:[^\s"]+|"[^"]*")+/g)
    .map((prop) => prop.replace(/"(.+)"/, "$1"));

  try {
    switch (command) {
      case COMMANDS.EXIT:
        terminal.writeFinishText();
        exit();

      case COMMANDS.UP:
        terminal.goUp();
        break;

      case COMMANDS.CD:
        if (props.length !== 1) throw new Error();

        terminal.changeDirectory(props[0]);
        break;

      case COMMANDS.LIST:
        terminal.listDirectory();
        break;

      case COMMANDS.CAT:
        if (props.length !== 1) throw new Error();

        terminal.readFile(props[0]);
        break;

      case COMMANDS.ADD:
        if (props.length !== 1) throw new Error();

        terminal.addEmptyFile(props[0]);
        break;

      case COMMANDS.RN:
        if (props.length !== 2) throw new Error();

        terminal.renameFile(props[0], props[1]);
        break;

      case COMMANDS.CP:
        if (props.length !== 2) throw new Error();

        terminal.copyFile(props[0], props[1]);
        break;

      case COMMANDS.MV:
        if (props.length !== 2) throw new Error();

        terminal.moveFile(props[0], props[1]);
        break;

      case COMMANDS.RM:
        if (props.length !== 1) throw new Error();

        terminal.removeFile(props[0]);
        break;

      case COMMANDS.OS:
        if (
          props.length !== 1 ||
          !Object.values(OS_PROPS).includes(`--${props[0]}`)
        ) {
          throw new Error();
        }

        terminal.showOsInfo(props[0].slice(2));
        break;

      case COMMANDS.HASH:
        if (props.length !== 1) throw new Error();

        terminal.showFileHash(props[0]);
        break;

      case COMMANDS.COMPRESS:
        if (props.length !== 2) throw new Error();

        terminal.compressFile(props[0], props[1]);
        break;

      case COMMANDS.DECOMPRESS:
        if (props.length !== 2) throw new Error();

        terminal.decompressFile(props[0], props[1]);
        break;

      default:
        throw new Error();
    }
  } catch (error) {
    terminal.writeInputError();
  }
};
