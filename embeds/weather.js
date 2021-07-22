const discord = require('discord.js');
const wtthr = require("../weather.json");

module.exports = {
    weather: function () {
        let emb = new discord.MessageEmbed()
            .setAuthor("Weather", (icon_url = `${wtthr.icon}`))
            .setColor(wtthr.C)
            .addField(
                wtthr.E1 + "  " + wtthr.N,
                "***      ***" + "  " + wtthr.D,
                false
            );
        return emb;
    },
};