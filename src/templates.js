const templates = {
  "Gridsome+VueJS": {
    path: "gridsome",
    repo: "https://github.com/lkmx/flare-starter-gridsome.git",
  },
  "VueJS+Gridsome": {
    path: "gridsome",
    repo: "https://github.com/lkmx/flare-starter-gridsome.git",
  },
};

export default {
  getDefaultName: function () {
    if (this.listNames().length == 0) {
      throw "No templates are defined, check the cli config";
    }
    return this.listNames()[0];
  },
  get: function (templateName) {
    return templates[templateName];
  },
  listNames: function () {
    return Object.keys(templates);
  },
};
