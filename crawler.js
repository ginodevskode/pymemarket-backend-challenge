const { program } = require("commander");
const axios = require("axios");
const unfluff = require("unfluff");

program
  .requiredOption("--url <url>", "Initial URL to start crawling from")
  .option("--maxdist <maxdist>", "Maximum distance from the initial website");

program.parse(process.argv);
const options = program.opts();
const results = {
  pages: [],
};

async function crawl(url, depth) {
  try {
    const response = await axios.get(url);
    console.log("response", unfluff(response.data));
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
          console.log(nextUrl);
        }
      }
    }
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
