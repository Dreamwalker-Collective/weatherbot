const eventStatus = require("./data/events.json");
const data = require("./data/connection");

module.exports = {
    eventOptions: () => Object.keys(eventStatus),

    setEvent: (input, guild) => {
        let wEvent = {};
        let entry = eventStatus[input];
        wEvent.N = entry.name;
        wEvent.C = entry.color;
        wEvent.icon = entry.image;
        wEvent.E2 = entry.emoji;
        wEvent.D = entry.comment;

        let settings = data.guild.cache(guild);
        settings.set("event", wEvent);
    },
};
