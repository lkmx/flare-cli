import chalk from "chalk";

const templates = [
  {
    name: "Gridsome+VueJS",
    path: "gridsome",
    repo: "https://github.com/lkmx/flare-starter-gridsome.git",
  },
  {
    name: "VueJS+Gridsome",
    path: "gridsome",
    repo: "https://github.com/lkmx/flare-starter-gridsome.git",
  },
];

export default {
  getDefaultName: function () {
    return templates[0];
  },
  get: function (templateName) {
    const template = templates.find((element) => element.name == templateName);
    if (template == undefined) {
      console.error("%s Invalid template: %s", chalk.red.bold("ERROR"), templateName);
      process.exit(1);
    }
    return template;
  },
  listNames: function () {
    return templates.map((t) => t.name);
  },
};
