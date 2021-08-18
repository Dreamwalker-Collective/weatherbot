const discord = require('discord.js');
const data = require("../data/connection");
const config = require("../config/config.json");
const eventUpdater = require("../eventUpdater");

module.exports = {
    event: async (guild) => {
        let cache = await data.guild.cache(guild);
        let event = await cache.get("event");

        if (!event) {
            await eventUpdater.setEvent("fullMoon", guild);
            event = await cache.get("event");
        }

        return new discord.MessageEmbed()
            .setAuthor("Event", event.icon)
            .setColor(event.C)
            .setDescription("What was the last event?")
            .addField(
                event.E2 + "  " + event.N,
                "***      ***" + "  " + event.D,
                false
            );
    },
    on: () => {
        return new discord.MessageEmbed()
            .setAuthor(
                "WeatherBot",
                (icon_url = "https://i.imgur.com/38ayDN2.jpg")
            )
            .setColor("#39b01c")
            .setTitle("Events have been turned on!");
    },
    off: () => {
        return new discord.MessageEmbed()
            .setAuthor(
                "WeatherBot",
                (icon_url = "https://i.imgur.com/38ayDN2.jpg")
            )
            .setColor("#c0150c")
            .setTitle("Events have been turned off!");
    },
    toggleHelp: () => {
        return new discord.MessageEmbed()
            .setColor("#7CFC00")
            .setTitle("Toggle Events")
            .setDescription("Choose an option:")
            .addField("on, off", `Usage: ${config.prefix}togglevents`, false);
    },
};