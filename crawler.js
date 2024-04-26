const { program } = require("commander");

program
  .requiredOption("--url <url>", "Initial URL to start crawling from")
  .option("--maxdist <maxdist>", "Maximum distance from the initial website");

program.parse(process.argv);
const options = program.opts();
const results = {
  pages: [],
};

console.log(options);
