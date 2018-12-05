const discord = require('discord.js');
const bot = new discord.Client();
const config = require("./config.json");
const weatherData = require("./weatherData.json")
const fs = require("fs");


bot.login(config.token);

bot.on('ready', () => {
    console.log('Ready!');
});

bot.on('message', message => {
    if (message.content === config.prefix + 'help'){
      let embedHelp = new discord.RichEmbed()
        .setTitle("help command")
        .setColor(colours())
        .addField("Standard", "`Help`, `ping`, `prefix`")
        .addField("Settings", "`setpref`")
        .addField("weatherData/Events", "`weatherData`, `weatherData Alter`, `Events`, `Event Alter`")
      return message.channel.send(embedHelp);
    }  
  });

  bot.on('message', message =>{
    if (message.content === ';;prefix') {
      let curpref = new discord.RichEmbed()
        .setTitle("whats ur prefix?")
        .setColor(colours())
        .addField(":b: prefix", "The current prefix is set to " + config.prefix)
      return message.channel.send(curpref)
}
});

bot.on('message', message =>{ 
    if(message.content.startsWith(config.prefix + 'setpref')){
        if(message.member.hasPermission('ADMINISTRATOR')){
        let newPrefix = message.content.split(" ").slice(1, 2)[0];
        config.prefix = newPrefix;
        fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
        let prefEmb = new discord.RichEmbed()
         .setColor(colours())
         .addField("Success!", "the command has been run perfectly")
         .addField(":gear: prefix", 'The prefix is now set to ' + config.prefix)
        return message.channel.send(prefEmb);
    }
        else{
            return console.log("yeet")
        }};
  });


  bot.on('message', message => {     
    if(message.content === config.prefix + 'ping') {
      message.channel.send('Pong')
    }
});





bot.on('message', message => {
    if(message.content === config.prefix + 'weatherData'){
      let weatherDataEmb = new discord.RichEmbed()
       .setColor(weatherDataColour())
       .addField(":earth_africa: weatherData", 'What\'s the weatherData today?')
       .addField(weatherDataEmoji() + ' ' + weatherData.weatherData, 'dabonem')
      return message.channel.send(weatherDataEmb);
    }
});








  function colours(){
    let kolors = ['#b53000','#e0af00','#b1e800','#1daa11','#09b774','#1092ba','#262da8','#7228a3','#bf1cae','#d30860','#c41717'];
    let random = kolors[Math.floor(Math.random()*kolors.length)];
    return random;
  };

  function weatherDataColour(){
    if(weatherData.weatherData === "Rainy"){
      return '#40a4df';
    }
    else if(weatherData.weatherData === "Snowy"){
      return '#fffafa';
    }
    else if(weatherData.weatherData === "Thunder"){
      return '#A99923';
    }
    else{
      return '#a2a4a5';
    }
  };
  
  function weatherDataEmoji(){
    if(weatherData.weatherData === "Rainy"){
      return ':cloud_rain:';
    }
    else if(weatherData.weatherData === "Snowy"){
      return ':cloud_snow:';
    }
    else if(weatherData.weatherData === "Thunder"){
      return ':thunder_cloud_rain:';
    }
    else{
      return ':leaves:';
    }
  }