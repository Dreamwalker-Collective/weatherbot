const weatherStatus = require("./data/weather.json");
const data = require("./data/connection");

module.exports = {
    weatherOptions: () => Object.keys(weatherStatus),

    setWeather: async (input, guild) => {
        let wthr = {};
        let entry = weatherStatus[input];
        wthr.N = entry.name;
        wthr.C = entry.color;
        wthr.icon = entry.image;
        wthr.E1 = entry.emoji;
        wthr.D = entry.comment;

        // console.log(wthr);

        let cache = await data.guild.cache(guild);
        return await cache.set("weather", wthr);
    },
};
