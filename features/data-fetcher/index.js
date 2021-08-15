const axios = require("axios").default;
const config = require("../../config");

const API_KEY = config.API_KEY;
const API_PLAYLIST_ID = config.API_PLAYLIST_ID; // ID of the playlist that has been created for all our uploads

const API_ENDPOINT = `https://www.googleapis.com/youtube/v3/playlistItems`;
const MAX_RESULTS = 50;

/**
 * Normalizes data to a format we need it to be in
 * @param {array} items
 * @returns {array} normalizedItems
 */
const normalizeItems = (items) => {
  const normalizedItems = items.map((item) => {
    return {
      videoId: item.snippet.resourceId.videoId,
      videoTitle: item.snippet.title,
      publishedAt: item.snippet.publishedAt,
    };
  });
  return normalizedItems;
};

/**
 * Fetches data for a next page
 * Note that if no nextToken is supplied, data for first page will be fetched
 * @param {string} nextToken
 * @returns
 */
const fetchNextPageData = async (nextToken = "") => {
  console.log(`Fetching page data with nextToken: ${nextToken}`);
  try {
    const res = await axios.get(
      `${API_ENDPOINT}?playlistId=${API_PLAYLIST_ID}&key=${API_KEY}&part=snippet&maxResults=${MAX_RESULTS}${
        nextToken !== "" ? `&pageToken=${nextToken}` : ""
      }`
    );
    console.log("Fetch Success!!");
    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed To fetch data.");
  }
};

/**
 * Fetches data page by page
 * @returns 
 */
const fetchAllData = async () => {
  let nextToken = "";
  let data = [];
  let i = 0;

  // Fetch data page by page
  // Keep fetching data until there is no next page
  while (nextToken !== undefined) {
    console.log("Fetching page: ", i + 1);
    // Fetching single page data
    const pageData = await fetchNextPageData(nextToken);

    // Merging with previous data
    data = [...data, ...pageData.items];

    // Update nextToken so that process can repeat
    nextToken = pageData.nextPageToken;
    i++;

    console.log("nextToken::: ", nextToken);
  }

  console.log("Fetched All data");

  //   for (i = 0; i < 18; i++) {
  //     console.log("Fetching page: ", i + 1);
  //     const pageData = await fetchNextPageData(nextToken);
  //     data = [...data, ...pageData.items];
  //     nextToken = pageData.nextPageToken;
  //     console.log("nextToken::: ", nextToken);
  //   }

  console.log("Final Data Length::: ", data.length);

  const items = normalizeItems(data);
  return items;
};

module.exports = { fetchAllData, fetchNextPageData, normalizeItems };
