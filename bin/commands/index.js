import { program } from "commander";
import chalk from "chalk";
import { commit, help } from "./options/index.js";

export default async (call) => {
  return new Promise((resolve, reject) => {
    program
      .name(chalk.green("gc"))
      .usage("command")
      .description(`
        ██████╗  ██████╗
        ██╔════╝ ██╔════╝
        ██║  ███╗██║     
        ██║   ██║██║     
        ╚██████╔╝╚██████╗
         ╚═════╝  ╚═════╝
        `)
      .helpOption(false)
      .helpCommand(false)
    // 版本信息
    program.version("1.0.0");
    // 帮助信息
    // program.option("-F, --framework", "surport vue,react");
    // 提交信息命令
    commit(program, (item) => resolve(item));
    // // 帮助信息
    // help(program);
    // 解析指令
    program.parse(process.argv);
  });
};
