const config = require("../config/config.json");
const Keyv = require("keyv");

const db = `sqlite://./data/${config.env}.sqlite`;

module.exports = {
    guild: {
        settings: (guild) =>
            new Keyv(db, {
                namespace: `guild.${guild}.settings`,
            }),
        cache: (guild) =>
            new Keyv(db, {
                namespace: `guild.${guild}.cache`,
            }),
    },
};
