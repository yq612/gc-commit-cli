/**
 * @description 帮助信息
 */
 import chalk from "chalk";

 export default (program) => {
   program.addHelpText(
     "after",
     `
       Run ${chalk.bgGreen(
         "gc <command> --help"
       )} for detailed usage of given command.`
   );
 };
 