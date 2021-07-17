const discord = require('discord.js');
const weather = require("../weather.json");
const weatherData = require("../weatherData.json");
const config = require('../config/config.json')

module.exports = {
    alter: function alter(author) {
        let emb = new discord.MessageEmbed()
            .setColor(weather.C)
            .setTitle(author + ' has used weather magic!')
            .setDescription('*It is now ' + weatherData.weather.toLowerCase() + '*')
        return emb
    },
    help: function halp() {
        let emb = new discord.MessageEmbed()
            .setColor("#7CFC00")
            .setTitle("Weather Altering Spell")
            .setDescription("Choose an option to change weather:")
            .addField("[1] sunny\n[2] windy\n[3] cloudy\n[4] rainy\n[5] stormy\n[6] snowy", "Usage: " + config.prefix + 'alter <1-6> || ' + config.prefix + 'weatheralter <weather>', false)
        return emb
    }
}