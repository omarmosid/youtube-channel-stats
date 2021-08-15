const axios = require("axios").default;
const config = require("../../config");

const getUploadPlaylist = async () => {
  const res = await axios.get(
    `https://www.googleapis.com/youtube/v3/channels?id=${config.API_CHANNEL_ID}&key=${config.API_KEY}&part=contentDetails`
  );
  const id = res.data.items[0].contentDetails.relatedPlaylists.uploads;
  return id;
};

getUploadPlaylist();
