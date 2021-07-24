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
    event: require("./embeds/event"),
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
bot.on("message", (message) => {
    if (message.author.bot || message.channel.type === "dm") return;

    if (message.content.toLowerCase() === `${config.prefix}start`) {
        if (!message.member.hasPermission("ADMINISTRATOR"))
            return message.channel.send(embeds.util.error());
        else {
            weatherUp();
            eventUp();
            message.delete();
        }
    }

    //help command
    else if (message.content.toLowerCase() === config.prefix + "help") {
        return message.channel.send(embeds.util.help());
    }

    //set the prefix
    else if (message.content.startsWith(config.prefix + "setpref")) {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(embeds.error.error());
        } else {
            return commands.setPrefix(message, bot);
        }
    }

    // togglevents
    else if (message.content.startsWith(`${config.prefix}toggle`)) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            return commands.toggleEvents(message);
        } else {
            return message.channel.send("`yah yeet no can do`");
        }
    }

    //actual weather stuff

    //what's the weather
    else if (message.content.toLowerCase() === config.prefix + "weather") {
        return message.channel.send(embeds.weather.weather());
    }

    //whats the event
    else if (message.content.toLowerCase() === config.prefix + "event") {
        return message.channel.send(embeds.event.event());
    }

    // WeatherAlter magic
    else if (message.content.startsWith(config.prefix + "weatheralter")) {
        return commands.alterWeather(message);
    }
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

setInterval(() => {
    var tmer = moment();
    if (weatherTimer.diff(tmer, "minutes") <= 1) {
        weatherTimer = moment().add(30, "minutes");
        weatherUp();
    }
    if (eventTimer.diff(tmer, "minutes") <= 1 && config.events === "on") {
        eventTimer = moment().add(4, "days");
        eventUp();
    }
}, 6000);

function weatherUp() {
    let rand = weathers[Math.floor(Math.random() * weathers.length)];
    weatherupdater.setWeather(rand);
    forecast.send(embeds.weather.weather());
}

function eventUp() {
    let rand = events[Math.floor(Math.random() * events.length)];
    eventUpdater.setEvent(rand);
    forecast.send(embeds.event.event());
}
        