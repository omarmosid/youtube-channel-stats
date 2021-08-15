require("dotenv").config();
const { fetchAllData, fetchNextPageData } = require("./features/data-fetcher");
const writeToCsv = require("./features/csv-writer");

const main = async () => {
  // Fetch Date from youtube API
  const items = await fetchAllData();
  // Write to CSV
  await writeToCsv();
};

main();
