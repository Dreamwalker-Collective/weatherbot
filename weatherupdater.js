const weatherStatus = require("./weatherStatus.json");
const fs = require("fs");

module.exports = {
  weatherOptions: () => Object.keys(weatherStatus),

  setWeather: (input) => {
    let wthr = {};
    let entry = weatherStatus[input];
    wthr.N = entry.name;
    wthr.C = entry.color;
    wthr.icon = entry.image;
    wthr.E1 = entry.emoji;
    wthr.D = entry.comment;

    console.log(wthr);

    fs.writeFile(
      "./weather.json",
      JSON.stringify(wthr),
      (err) => console.error
    );
  },
};
