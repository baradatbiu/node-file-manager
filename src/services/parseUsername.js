import { argv } from "process";

const args = argv.slice(2);

export const parseUsername = () => {
  if (args.length !== 1) throw Error();

  const potentialUsername = args[0];
  const regex = new RegExp(/^--username=/);

  if (!regex.test(potentialUsername)) throw Error();

  const username = potentialUsername.replace(regex, "");

  return username;
};
