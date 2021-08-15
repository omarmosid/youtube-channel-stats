const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const defaultRecords = [
  { name: "Bob", lang: "French" },
  { name: "Mary", lang: "English" },
];

const defaultHeader = [
  { id: "videoId", title: "videoId" },
  { id: "videoTitle", title: "videoTitle" },
  { id: "publishedAt", title: "publishedAt" },
];

const writeToCsv = async (
  records = defaultRecords,
  header = defaultHeader,
  path = `./data-${new Date().getTime()}.csv`
) => {
  console.log(`Writing ${records.length} records to CSV at "${path}"...`);
  const csvWriter = createCsvWriter({
    path: path,
    header: header,
  });
  try {
    await csvWriter.writeRecords(records);
    console.log("...Finished Writing");
  } catch (error) {
    console.log(
      "ERROR:: Unable to write records. Make sure the CSV file is not open in another program."
    );
  }
};

module.exports = writeToCsv;
