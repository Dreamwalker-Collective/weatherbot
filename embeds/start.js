const discord = require('discord.js');
const config = require("../config/config.json");

module.exports = {
    start: function start() {
            let emb = new discord.MessageEmbed()
                .setAuthor("WeatherBot", icon_url = "https://i.imgur.com/38ayDN2.jpg")
                .setColor("#ff0040")
                .setTitle("Started successfully!")
                .setDescription(`Having trouble? Try ${config.prefix}help`)
            return emb;
}}