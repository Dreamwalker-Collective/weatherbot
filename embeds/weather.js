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
    alter: function alter(author) {
        let emb = new discord.MessageEmbed()
            .setColor(weather.C)
            .setTitle(author + " has used weather magic!")
            .setDescription(
                "*It is now " + weatherData.weather.toLowerCase() + "*"
            );
        return emb;
    },
    alterHelp: function halp() {
        let emb = new discord.MessageEmbed()
            .setColor("#7CFC00")
            .setTitle("Weather Altering Spell")
            .setDescription("Choose an option to change weather:")
            .addField(
                "[1] sunny\n[2] windy\n[3] cloudy\n[4] rainy\n[5] stormy\n[6] snowy",
                "Usage: " +
                    config.prefix +
                    "alter <1-6> || " +
                    config.prefix +
                    "weatheralter <weather>",
                false
            );
        return emb;
    },
};