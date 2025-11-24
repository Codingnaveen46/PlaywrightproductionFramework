const { CucumberJSAllureFormatter } = require("allure-cucumberjs");
const { AllureRuntime } = require("allure-js-commons");

class Reporter extends CucumberJSAllureFormatter {
  constructor(options) {
    super(
      options,
      new AllureRuntime({ resultsDir: "./allure-results" }),
      {
        labels: [],
        links: []
      }
    );
  }
}

module.exports = Reporter;
