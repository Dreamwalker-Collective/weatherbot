const discord = require('discord.js');
const event = require('../events.json');
const config = require('../config/config.json');

module.exports = {
    on: function (){
            let emb = new discord.MessageEmbed()
                .setAuthor("WeatherBot", icon_url = "https://i.imgur.com/38ayDN2.jpg")
                .setColor("#39b01c")
                .setTitle("Events have been turned on!")
            return emb
    },
    off: function() {
            let emb = new discord.MessageEmbed()
                .setAuthor("WeatherBot", icon_url = "https://i.imgur.com/38ayDN2.jpg")
                .setColor("#c0150c")
                .setTitle("Events have been turned off!")
            return emb
    },
    help: function() {
            let emb = new discord.MessageEmbed()
            .setColor("#7CFC00")
            .setTitle("Toggle Events")
            .setDescription("Choose an option:")
            .addField("on, off", `Usage: ${config.prefix}togglevents`, false)
            return emb
        }
}