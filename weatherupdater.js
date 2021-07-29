const weatherStatus = require("./data/weather.json");
const data = require("./data/connection");

module.exports = {
    weatherOptions: () => Object.keys(weatherStatus),

    setWeather: (input, guild) => {
        let wthr = {};
        let entry = weatherStatus[input];
        wthr.N = entry.name;
        wthr.C = entry.color;
        wthr.icon = entry.image;
        wthr.E1 = entry.emoji;
        wthr.D = entry.comment;

        console.log(wthr);

        let settings = data.guild.cache(guild);
        settings.set("weather", wthr);
    },
};
