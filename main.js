const Discord = require("discord.js");
const bot = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
  ],
  partials: ["MESSAGE", "CHANNEL"],
});
const fs = require("fs");
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
bot.login(config.token);
var CronJob = require('cron').CronJob;
var job = new CronJob(
	'00 00 09 * * *',
	function() {
		console.log('Nachricht gesendet!');
		bot.channels.cache.get(config.channelid).send(text)
	},
	null,
	true,
	'Europe/Berlin'
);

bot.on("ready", () => {
  console.log("Ready!");
  
});
bot.on("messageCreate", async (message) => {
if(message.content.startsWith(config.prefix + "check")) {
let argument =  message.content.split(" ").slice(1).join(" ");
if(argument == config.correct) {message.channel.send(config.correctarg)}
else message.channel.send(config.falsearg)
}
});