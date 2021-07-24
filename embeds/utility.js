const discord = require("discord.js");

module.exports = {
    start: function start(config) {
        let emb = new discord.MessageEmbed()
            .setAuthor(
                "WeatherBot",
                (icon_url = "https://i.imgur.com/38ayDN2.jpg")
            )
            .setColor("#ff0040")
            .setTitle("Started successfully!")
            .setDescription(`Having trouble? Try ${config.prefix}help`);
        return emb;
    },

    error: function error() {
        let emb = new discord.MessageEmbed()
            .setAuthor(
                "WeatherBot",
                (icon_url = "https://i.imgur.com/38ayDN2.jpg")
            )
            .setColor("#ff0a16")
            .setTitle(":x: ***Error!***")
            .setDescription("*You don't have permission to do this!*");
        return emb;
    },

    success: function success() {
        let emb = new discord.MessageEmbed()
            .setColor("#2c9601")
            .addField("Success!", "The command has been run");
        return emb;
    },

    help: function help(config) {
        let emb = new discord.MessageEmbed()
            .setAuthor(
                "WeatherBot",
                (icon_url = "https://i.imgur.com/38ayDN2.jpg")
            )
            .setColor("#956a6a")
            .setTitle("List of all commands")
            .addField("General", "`help`, `start`", false)
            .addField("Settings", "`setpref`, `togglevents`", false)
            .addField("Weather", "`weather`, `event`", false)
            .setFooter(`The current prefix is ${config.prefix}`);
        return emb;
    },
};
