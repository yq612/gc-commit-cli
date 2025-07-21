#!/usr/bin/env node

import inquirer from "inquirer";
import shell from "shelljs";


export default (program, call) => {
  program
    .command('commit')
    .alias('cm')
    .description('自动执行 git add 并且创建一份提交信息')
    .action(async () => {
      const answers = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'checkbox',
          message: '请选择提交类型:',
          choices: [
            { name: '✨ feat: 增加新功能', value: 'feat' },
            { name: '🐛 fix: 修复bug', value: 'fix' },
            { name: '📝 docs: 修改文档', value: 'docs' },
            { name: '🎨 style: 修改代码格式，不影响功能', value: 'style' },
            { name: '🔥 perf: 性能优化、体验优化', value: 'perf' },
            { name: '🔧 refactor: 代码重构，不影响功能', value: 'refactor' },
            { name: '✅ test: 添加或修改测试代码', value: 'test' },
            { name: '🔩 chore: 构建工具、辅助工具的变动', value: 'chore' }
          ]
        },
        {
          type: 'input',
          name: 'scope',
          message: '请输入影响范围（例如文件、模块等）:',
        },
        {
          type: 'input',
          name: 'description',
          message: '请输入简要描述:',
          validate(input) {
            return input ? true : '描述不能为空';
          },
        },
      ]);

      const { checkbox, scope, description } = answers;
      const commitMessage = `${checkbox}(${scope}): ${description}`;

      // 执行 git add . 和 git commit -m
      if (shell.exec(`git add .`).code !== 0) {
        shell.echo('Error: Git add failed');
        shell.exit(1);
      }

      if (shell.exec(`git commit -m "${commitMessage}"`).code !== 0) {
        shell.echo('Error: Git commit failed');
        shell.exit(1);
      } else {
        shell.echo('Commit completed successfully!');
      }

      // 执行 git push
      if (shell.exec(`git push`).code !== 0) {
        shell.echo('Error: Git push failed');
        shell.exit(1);
      } else {
        shell.echo('Push completed successfully!');
      }
    });
};
