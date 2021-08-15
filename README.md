## Youtube Stats Generator

### Pre-requisites
** Make sure you have node and npm isntalled **
** Make sure you have a google youtube API key **
** Every channel has a default playlist for uploads. We will be using this playlist id to fetch list of all videos uploaded to your channel.

### How to use
1. Clone repo
2. Run `npm install` to install dependecies
3. Add a .env file to project root
4. Add env variable API_KEY and put your google API key
5. Add env variable API_PLAYLIST_ID and put your upload playlist id
6. Run `npm start` and you will notice a new csv file: "test.csv" will be created
7. Open csv file