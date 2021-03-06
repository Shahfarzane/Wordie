require("dotenv").config();
const imageSearch = require("image-search-google");

const client = new imageSearch(process.env.CSE, process.env.API_KEY);

function getImages(param, res) {
  client
    .search(param, { page: 1 })
    .then((images) => {
      res.send(images);
    })
    .catch((ex) => {
      console.log(ex);
      res.send([]);
    });
}

module.exports = {
  getImages,
};
