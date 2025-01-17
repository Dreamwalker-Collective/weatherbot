const data = require("./data/connection");

//embeds
const embeds = {
    util: require("./embeds/utility"),
    weather: require("./embeds/weather"),
    events: require("./embeds/event"),
};

module.exports = {
    setPrefix: (message, bot, guild) => {
        let newPrefix = message.content.split(" ").slice(1, 2)[0];

        let config = data.guild.settings(guild);

        if (newPrefix) {
            config.prefix = newPrefix;
            fs.writeFile(
                "./config/config.json",
                JSON.stringify(config),
                (err) => console.error
            );
            message.guild
                .member(bot.user)
                .setNickname(`[${config.prefix}]${bot.user.username}`);
            return message.channel.send(embeds.util.success());
        } else {
            return message.channel.send(
                embeds.util.error("You must supply a prefix to use!")
            );
        }
    },

    toggleEvents: (message) => {
        config.events = !config.events;
        fs.writeFile(
            "./config/config.json",
            JSON.stringify(config),
            (err) => console.error
        );

        if (config.events) {
            return message.channel.send(embeds.events.on());
        }

        return message.channel.send(embeds.events.off());
    },

    alterWeather: (message, guild) => {
        if (message.member.roles.find((x) => x.name === "Weather Mage")) {
            let wArg = message.content.split(" ").slice(1, 2)[0];
            if (wArg && wArg in weatherupdater.weatherOptions()) {
                weatherupdater.setWeather(wArg);
                weatherData.weather = weather.N;
                fs.writeFile(
                    "./weatherData.json",
                    JSON.stringify(weatherData),
                    (err) => console.error
                );
                forecast.send(ewthr.weather());
                const author = message.author.username;
                return message.channel.send(embeds.weather.alter(author));
            } else if (wArg === undefined) {
                return message.channel.send(embeds.weather.alterHelp());
            } else {
                return message.channel.send(
                    "`Invalid weather condition. Type " +
                        config.prefix +
                        "weatheralter for more info.`"
                );
            }
        } else {
            return message.channel.send(
                embeds.error.error("You do not have permission to do that!")
            );
        }
    },
};
