const eventStatus = require("./eventStatus.json");
const fs = require("fs");

module.exports = {
  eventOptions: () => Object.keys(eventStatus),

  setEvent: (input) => {
    let wEvent = {};
    let entry = eventStatus[input];
    wEvent.N = entry.name;
    wEvent.C = entry.color;
    wEvent.icon = entry.image;
    wEvent.E2 = entry.emoji;
    wEvent.D = entry.comment;

    fs.writeFile(
      "./events.json",
      JSON.stringify(wEvent),
      (err) => console.error
    );
  },
};
