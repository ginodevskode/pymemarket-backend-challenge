const { program } = require("commander");
const axios = require("axios");
const unfluff = require("unfluff");
const fs = require("fs");

program
  .requiredOption("--url <url>", "Initial URL to start crawling from")
  .option("--maxdist <maxdist>", "Maximum distance from the initial website")
  .option("--output <output>", "Output file for the results");

program.parse(process.argv);
const options = program.opts();
const results = {
  pages: [],
};

async function crawl(url, depth) {
  if (depth === 0) return;
  if (results.pages.length >= 1000) return;

  try {
    const response = await axios.get(url);
    const { title, text, links } = unfluff(response.data);
    results.pages.push({
      url,
      title,
      text,
    });
    if (Array.isArray(links)) {
      for (const link of links) {
        if (typeof link.href === "string" && link.href.startsWith("/")) {
          const nextUrl = `${options.url}${link.href}`;
          await crawl(nextUrl, depth - 1);
        }
      }
    }
  } catch (error) {
    console.error(`Error crawling ${url}: ${error.message}`);
  }
}

async function main() {
  await crawl(options.url, parseInt(options.maxdist));
  const jsonData = JSON.stringify(results, null, 2);
  fs.writeFileSync(options.output, jsonData);
  console.log(`Results saved in ${options.output}`);
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
});
