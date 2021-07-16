const event = require("./events.json");
const eventStatus = require("./eventStatus.json")
const fs = require("fs");

module.exports = {
    avalanche: function A() {
        event.N = "Avalanche"
        event.C = eventStatus.AC;
        event.icon = eventStatus.AE1;
        event.E2 = eventStatus.AE2;
        event.D = eventStatus.AD;
        fs.writeFile("./events.json", JSON.stringify(event), (err) => console.error);
    },

    stars: function S() {
        event.N = "Star align"
        event.C = eventStatus.SC;
        event.icon = eventStatus.SE1;
        event.E2 = eventStatus.SE2;
        event.D = eventStatus.SD;
        fs.writeFile("./events.json", JSON.stringify(event), (err) => console.error);
    },

    tornado: function T() {
        event.N = "Tornado"
        event.C = eventStatus.TC;
        event.icon = eventStatus.TE1;
        event.E2 = eventStatus.TE2;
        event.D = eventStatus.TD;
        fs.writeFile("./events.json", JSON.stringify(event), (err) => console.error);
    },

    moon: function FM() {
        event.N = "Full moon"
        event.C = eventStatus.FMC;
        event.icon = eventStatus.FME1;
        event.E2 = eventStatus.FME2;
        event.D = eventStatus.FMD;
        fs.writeFile("./events.json", JSON.stringify(event), (err) => console.error);
    },

    fstars: function FS() {
        event.N = "Falling stars"
        event.C = eventStatus.FSC;
        event.icon = eventStatus.FSE1;
        event.E2 = eventStatus.FSE2;
        event.D = eventStatus.FSD;
        fs.writeFile("./events.json", JSON.stringify(event), (err) => console.error);
    },

    eclipse: function E() {
        event.N = "Eclipse"
        event.C = eventStatus.EC;
        event.icon = eventStatus.EE1;
        event.E2 = eventStatus.EE2;
        event.D = eventStatus.ED;
        fs.writeFile("./events.json", JSON.stringify(event), (err) => console.error);
    }
};