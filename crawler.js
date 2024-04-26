const { program } = require("commander");
const axios = require("axios");
const unfluff = require("unfluff");

program
  .requiredOption("--url <url>", "Initial URL to start crawling from")
  .option("--maxdist <maxdist>", "Maximum distance from the initial website");

program.parse(process.argv);
const options = program.opts();

async function crawl(url, depth) {
  try {
    const response = await axios.get(url);
    console.log("response", unfluff(response.data));
    const { title, text, links } = unfluff(response.data);
    console.log(title, text, links);
  } catch (error) {
    console.error(`Error crawling ${url}: ${error.message}`);
  }
}

async function main() {
  await crawl(options.url, parseInt(options.maxdist));
  // ToDo: save results
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
});
