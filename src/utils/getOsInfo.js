import { arch, cpus, EOL, homedir, userInfo } from "os";
import { OS_PROPS } from "../constants.js";

export const getOsInfo = (osInfoKey) => {
  switch (osInfoKey) {
    case OS_PROPS.EOL:
      return JSON.stringify(EOL);

    case OS_PROPS.CPUS:
      return cpus().map(({ model, speed }) => ({
        model,
        speed: Math.floor((speed / 1000) * 10) / 10,
      }));

    case OS_PROPS.HOMEDIR:
      return homedir();

    case OS_PROPS.USERNAME:
      const { username } = userInfo();
      return username;

    case OS_PROPS.ARCHITECTURE:
      return arch();

    default:
      throw new Error();
  }
};
