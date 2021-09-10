//requirements

//config/ dcjs
const discord = require("discord.js");
const config = require("./config/config.json");

//weather/ event stuff
const weatherupdater = require("./weatherupdater.js");
const eventUpdater = require("./eventUpdater.js");

//embeds
const embeds = {
    util: require("./embeds/utility"),
    weather: require("./embeds/weather"),
    events: require("./embeds/event"),
};

// commands
const commands = require("./commands");

//variables
var forecast;
let mainchannel = config.channel;

//login
const bot = new discord.Client({ disableEveryone: true });
bot.login(config.token);

//log on start
bot.on("ready", () => {
    console.log(`${bot.user.username} is ready!`);

    bot.user.setActivity("the skies", { type: "WATCHING" });

    //find channels, start embed
    forecast = bot.channels.cache.find((x) => x.name === mainchannel);
    if (!forecast) {
        console.log(
            `[ERR] No ${mainchannel} detected! ${bot.user.username} will now shutdown`
        );
        bot.destroy(bot);
    } else {
        return forecast.send(embeds.util.start(config));
    }
});

//in case shit goes wrong
bot.on("message", async (message) => {
    if (message.author.bot || message.channel.type === "dm") return;

    const guild = message.guild.id;

    if (message.content.toLowerCase() === `${config.prefix}start`) {
        if (!message.member.hasPermission("ADMINISTRATOR"))
            return message.channel.send(
                embeds.util.error("You do not have permission to do that!")
            );
        else {
            weatherUp(guild);
            eventUp(guild);
        }
    }

    //help command
    else if (message.content.toLowerCase() === config.prefix + "help") {
        return message.channel.send(embeds.util.help(config));
    }

    //set the prefix
    else if (message.content.startsWith(config.prefix + "setpref")) {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(
                embeds.error.error("You do not have permission to do that!")
            );
        } else {
            return commands.setPrefix(message, bot);
        }
    }

    // togglevents
    else if (message.content.startsWith(`${config.prefix}toggle`)) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            return await commands.toggleEvents(message, bot, guild);
        } else {
            return message.channel.send(
                embeds.error.error("You do not have permission to do that!")
            );
        }
    }

    //actual weather stuff

    //what's the weather
    else if (message.content.toLowerCase() === config.prefix + "weather") {
        return message.channel.send(await embeds.weather.weather(guild));
    }

    //whats the event
    else if (message.content.toLowerCase() === config.prefix + "event") {
        return message.channel.send(await embeds.events.event(guild));
    }

    // WeatherAlter magic
    else if (message.content.startsWith(config.prefix + "weatheralter")) {
        return commands.alterWeather(message, guild);
    }

    message.delete();
});

//timeline

const moment = require("moment");
var weatherTimer;
var eventTimer;

const weathers = [
    "cloudy",
    "cloudy",
    "cloudy",
    "sunny",
    "sunny",
    "sunny",
    "windy",
    "windy",
    "rainy",
    "rainy",
    "stormy",
    "stormy",
];
const events = [
    "tornado",
    "fullMoon",
    "avalanche",
    "solarEclipse",
    "meteorShower",
];

weatherTimer = moment().add(30, "minutes");
eventTimer = moment().add(4, "days");

// setInterval(() => {
//     var tmer = moment();
//     if (weatherTimer.diff(tmer, "minutes") <= 1) {
//         weatherTimer = moment().add(30, "minutes");
//         weatherUp();
//     }
//     if (eventTimer.diff(tmer, "minutes") <= 1 && config.events === "on") {
//         eventTimer = moment().add(4, "days");
//         eventUp();
//     }
// }, 6000);

async function weatherUp(guild) {
    let rand = weathers[Math.floor(Math.random() * weathers.length)];
    await weatherupdater.setWeather(rand, guild);
    forecast.send(await embeds.weather.weather(guild));
}

async function eventUp(guild) {
    let rand = events[Math.floor(Math.random() * events.length)];
    await eventUpdater.setEvent(rand, guild);
    forecast.send(await embeds.events.event(guild));
}
        