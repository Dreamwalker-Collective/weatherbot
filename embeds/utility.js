const discord = require("discord.js");

module.exports = {
    start: (config) => {
        return new discord.MessageEmbed()
            .setAuthor(
                "WeatherBot",
                (icon_url = "https://i.imgur.com/38ayDN2.jpg")
            )
            .setColor("#ff0040")
            .setTitle("Started successfully!")
            .setDescription(`Having trouble? Try ${config.prefix}help`);
    },

    error: (desc = "Something went wrong!") => {
        return new discord.MessageEmbed()
            .setAuthor(
                "WeatherBot",
                (icon_url = "https://i.imgur.com/38ayDN2.jpg")
            )
            .setColor("#ff0a16")
            .setTitle(":x: ***Error!***")
            .setDescription(`*${desc}*`);
    },

    success: () => {
        return new discord.MessageEmbed()
            .setColor("#2c9601")
            .addField("Success!", "The command has been run");
    },

    help: (config) => {
        return new discord.MessageEmbed()
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
    },
};
