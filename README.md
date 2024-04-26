# Pymemarket-backend-challenge

The objective of this challenge is to build the core of a web crawler that will crawl the websites that are linked to an initial URL (exactly what Google does). You should save the text from this pages so later someone else can implement the search functionality. The search functionality should return the URLs and its titles that match with the query (exactly what Google does, eg: give me all the pages that contain the word apple and/or banana)

## Usage

1. Install all dependencies `npm install`
2. Launch the Web Crawler running the following command in CLI `node src/crawler.js --url http://www.foodsubs.com --maxdist 2 --output src/data/results.json`

