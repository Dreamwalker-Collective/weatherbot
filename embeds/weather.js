const discord = require('discord.js');
const data = require("./data/connection");

module.exports = {
    weather: (guild) => {
        let cache = data.guild.cache(guild);
        let weather = cache.get("weather");
        return new discord.MessageEmbed()
            .setAuthor("Weather", (icon_url = `${weather.icon}`))
            .setColor(weather.C)
            .addField(
                weather.E1 + "  " + weather.N,
                "***      ***" + "  " + weather.D,
                false
            );
    },
    alter: (author, guild) => {
        let cache = data.guild.cache(guild);
        let weather = cache.get("weather");
        return new discord.MessageEmbed()
            .setColor(weather.C)
            .setTitle(author + " has used weather magic!")
            .setDescription(
                "*It is now " + weatherData.weather.toLowerCase() + "*"
            );
    },
    alterHelp: () => {
        return new discord.MessageEmbed()
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
    },
};