import arg from "arg";
import inquirer from "inquirer";
import { flareStart } from "./main";
import templates from "./templates";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--git": Boolean,
      "--yes": Boolean,
      "--install": Boolean,
      "-g": "--git",
      "-y": "--yes",
      "-i": "--install",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    skipPrompts: args["--yes"] || false,
    git: args["--git"] || false,
    templateName: args._[0],
    runInstall: args["--install"] || false,
  };
}

async function promptForMissingOptions(options) {
  if (options.skipPrompts) {
    return {
      ...options,
      template:
        templates.get(options.templateName),
    };
  }

  const questions = [];
  if (!options.templateName) {
    questions.push({
      type: "list",
      name: "templateName",
      message: "Please choose which project template to use",
      choices: templates.listNames(),
      default: templates.getDefaultName(),
    });
  }

  if (!options.git) {
    questions.push({
      type: "confirm",
      name: "git",
      message: "Initialize a git repository?",
      default: false,
    });
  }

  const answers = await inquirer.prompt(questions);

  const templateName = options.templateName || answers.templateName;

  return {
    ...options,
    templateName: templateName,
    template: templates.get(templateName),
    git: options.git || answers.git,
  };
}

export async function cli(args) {
  const rawOptions = parseArgumentsIntoOptions(args);
  const options = await promptForMissingOptions(rawOptions);
  await flareStart(options);
}
