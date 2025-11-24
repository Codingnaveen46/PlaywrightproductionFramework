module.exports = {
    default: {
        tags: "",
        formatOptions: {
            snippetInterface: "async-await",
        },
        paths: ["features/**/*.feature"],
        dryRun: false,
        require: [
            "src/steps/**/*.ts",
            "src/hooks/**/*.ts",
            "src/support/**/*.ts"
        ],
        requireModule: ["ts-node/register"],
        format: [
            "progress-bar",
            // "./src/support/reporter.js"
        ],
    },
};
