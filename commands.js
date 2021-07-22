const config = require("./config/config.json");
const eeror = require("./embeds/error");
const etogg = require("./embeds/togglevents");
const esucc = require("./embeds/success");

const fs = require("fs");

module.exports = {
    setPrefix: (message) => {
        let newPrefix = message.content.split(" ").slice(1, 2)[0];

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
            return message.channel.send(esucc.success());
        } else {
            return message.channel.send(eeror.error());
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
            return message.channel.send(etogg.on());
        }

        return message.channel.send(etogg.off());
    },

    alterWeather: (message) => {
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
                message.channel.send(ealtr.alter(author));
            } else if (wArg === undefined) {
                message.channel.send(ealtr.help());
            } else {
                message.channel.send(
                    "`Invalid weather condition. Type " +
                        config.prefix +
                        "weatheralter for more info.`"
                );
            }
        } else {
            message.channel.send("`Yah Yeet No can do`");
        }
    },
};
