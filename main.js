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
const tickets = require("./tickets.json");
const { Permissions, MessageActionRow, MessageButton } = require("discord.js");
bot.login(config.token);
var prefix = config.prefix
var obj = JSON.parse(fs.readFileSync('./text.json', 'utf8'));
let embed = new Discord.MessageEmbed()
.setTitle("Aufgabe des Tages")
.setDescription("Die heutige Aufgabe lautet: " + "```" + obj + "```" + " Du hast bis 19 Uhr Zeit, diese in #PLACEHOLDER abzugeben!")
.setColor("YELLOW")
var CronJob = require('cron').CronJob;
var job = new CronJob(
	'00 00 9 * * *',
	function() {
		console.log('Nachricht gesendet!');
		bot.channels.cache.get(config.channelid).send({embeds: [embed]})
	},
	null,
	true,
	'Europe/Berlin'
);
bot.on("ready", () => {
	let statuse = [
		"mit Bietz 😏",
		`mit ${bot.channels.cache.size} Usern`,
		`auf ${bot.guilds.cache.size} Servern`,
		"by WaldperlachFabi"
	];
	let number = 0;
	bot.user.setActivity(statuse[statuse.length]);

	setInterval(() => {
	  let rstatus = statuse[number];
  
	  bot.user.setActivity(rstatus);
  
	  number++;
  
	  if (number >= statuse.length) {
		number = 0;
	  }
	}, 5000);
    console.log(`${bot.user.username} ready!`);
  
});
bot.on("messageCreate", async (message) => {
if (
message.content.startsWith( prefix + "help")) {
let embed = new Discord.MessageEmbed()
				.setTitle("Info")
				.setDescription("Vom **1.** bis zum **24.12.** wird in diesem Channel jeden Tag um **9 Uhr** ein kleines Rätsel gestellt. Wenn du dir sicher bist, dass du die Richtige Antwort hast kannst du den Button unten drücken. Dies wird einen Channel erstellen in welchem du uns **maximal eine** Lösung mitteilst. Um **19 Uhr** jedes Tages wird dann unter denen, die das Rätsel richtig beantwortet haben ausgelost! Der Gewinn wird gleichzeitig mit dem Gewinner hier in diesem Channel bekannt gegeben! Zu gewinnen gibt viele coole unterschiedliche Sachen, wie Beispielsweise **Discord Nitro, Steamkeys und viel mehr** cooles 😀👍 Viel Spaß und Erfolg wünscht das ganze Bietz Team!")
				.setColor("YELLOW")
	
		message.channel.send({embeds: [embed]})
}
if (
		message.content.startsWith( prefix + "edit") //&&
		//message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
	  ) {
	  let edittext =  message.content.split(" ").slice(1).join(" ");
	  fs.writeFileSync("./text.json", JSON.stringify(edittext));
var obj = JSON.parse(fs.readFileSync('./text.json', 'utf8'));
	  message.channel.send({content: "Ich habe die nächste Aufgabe auf " + obj + " gesetzt!"})
	  }
if (
		message.content.startsWith( prefix + "read") //&&
		//message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
	  ) {
	  var obj = JSON.parse(fs.readFileSync('./text.json', 'utf8'));
	  message.channel.send({content: "Die nächste Aufgabe lautet: " + obj})
	  }
	if (
		message.content.startsWith( prefix + "SECRET") //&&
		//message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
	  ) {
		let channel = message.mentions.channels.first();
		let kate;
		let modrole = message.mentions.roles;
	
		message.guild.channels.cache.forEach((chn) => {
		  if (
			chn.type == "GUILD_CATEGORY" &&
			!kate &&
			chn.name.toLowerCase() == "》・antworten・《"
		  ) {
			kate = chn;
		  }
		});
	
		if (!channel)
		  return message.channel.send({
			content:
			  "Du musst einen kanal anegeben, wo die nachricht reingesendt werden soll.",
		  });
	
		if (!kate) {
		  await message.guild.channels
			.create("》・antworten・《", {
			  type: "GUILD_CATEGORY",
			  permissionOverwrites: [
				{ id: message.guild.id, deny: ["VIEW_CHANNEL"] },
				{ id: bot.user.id, allow: ["VIEW_CHANNEL"] },
			  ],
			})
			.then((l) => (kate = l));
		}
	
		if (!tickets[message.guild.id]) {
		  tickets[message.guild.id] = {
			id: 0,
			access: [],
		  };
		}
	
		let l = [
		  {
			id: message.guild.id,
			deny: ["VIEW_CHANNEL"],
		  },
		  {
			id: bot.user.id,
			allow: ["VIEW_CHANNEL"],
		  },
		];
	
		modrole.forEach((role) => {
		  l.push({ id: role.id, allow: ["VIEW_CHANNEL"] });
		});
	
		tickets[message.guild.id].id = kate.id;
	
		tickets[message.guild.id].access = l;
	
		fs.writeFileSync("./tickets.json", JSON.stringify(tickets));
	
		let button = new Discord.MessageButton()
		  .setLabel("")
		  .setCustomId("create_ticket_button")
		  .setStyle("SECONDARY")
		  .setEmoji("📩");
	
		let row = new Discord.MessageActionRow().addComponents(button);
	
				let embed = new Discord.MessageEmbed()
				.setTitle("Antwort")
				.setDescription("Drücke auf 📩 um eine Antwort abzuschicken! Bitte überleg dir **vorher** ob du dir sicher bist und so die Aufgabe abgeben willst! Pro Person Maximal **eine** Abgabe! - Verstoß hiergegen kann zu einem **Warn** führen!")
				.setColor("YELLOW")
	
		channel.send({embeds: [embed],
		  components: [row],
		});
	  }
if(message.content == ( prefix + "ping")) {
	const start = Date.now();
        message.channel.send('Pong!').then(m => {
            const embed = new Discord.MessageEmbed()
                .setColor('YELLOW')
                .setTitle(bot.user.username + " - Pong!")
                .setThumbnail(bot.user.displayAvatarURL())
                .addField(`Message Ping`, `\`${Date.now() - start}ms\` 🛰️`)
                .addField(`Message Latency`, `\`${m.createdTimestamp - start}ms\` 🛰️`)
                .addField(`API Latency`, `\`${Math.round(bot.ws.ping)}ms\` 🛰️`)
                .setTimestamp()
                .setFooter({ text: 'Adventskalender - by Waldperlach.Fabi#6862', iconURL: message.author.avatarURL({ dynamic: true }) });
            m.edit({ embeds: [embed]});
        })
}
if(message.channel.id == config.channelidcheck){
if(message.content.startsWith(config.prefix + "check")) {
let argument =  message.content.split(" ").slice(1).join(" ");
if(argument == config.correct) {message.channel.send(config.correctarg)}
else message.channel.send(config.falsearg)
}
}
});
bot.on("interactionCreate", async (interaction) => {
	if (interaction.customId == "create_ticket_button") {
	  interaction.deferUpdate();
	  if (tickets[interaction.guild.id]) {
		if (!bot.channels.cache.get(tickets[interaction.guild.id].id)) {
		  await interaction.guild.channels
			.create("》・antworten・《", {
			  type: "GUILD_CATEGORY",
			  permissionOverwrites: [
				{ id: interaction.guild.id, deny: ["VIEW_CHANNEL"] },
				{ id: bot.user.id, allow: ["VIEW_CHANNEL"] },
			  ],
			})
			.then((l) => (tickets[interaction.guild.id].id = l.id));
		}
  
		tickets[interaction.guild.id].access.push({
		  id: interaction.user.id,
		  allow: ["VIEW_CHANNEL"],
		});
  
		interaction.guild.channels
		  .create("antwort-" + Math.floor(Math.random() * 1000), {
			type: "GUILD_TEXT",
			parent: bot.channels.cache.get(tickets[interaction.guild.id].id),
			permissionOverwrites: tickets[interaction.guild.id].access,
		  })
		  .then((chn) => {
			                let embed = new Discord.MessageEmbed()
			                .setTitle("Info")
			                .setDescription("In diesem Channel hast du die Möglichkeit, uns deine Antwort mitzuteilen! Wichtig dabei ist, dass du nur **eine** Antwort einreichst! Wenn du mehrer Antworten abgibst bist du Automatisch augeschieden! Falls du dir doch unsicher bist kannst du diesen Channel mit :x: löschen - deine Antwort wird dann **nicht** gezählt!")
			                .setColor("YELLOW")
			                .setTimestamp();
  
			let row = new Discord.MessageActionRow().addComponents(
			  new Discord.MessageButton()
				.setLabel("")
				.setCustomId("close_ticket_button")
				.setStyle("DANGER")
				.setEmoji("❌")
			);
  
			chn.send({
			  embeds: [embed],
			  components: [row],
			});
		  });
		tickets[interaction.guild.id].access.splice(
		  tickets[interaction.guild.id].access.length - 1,
		  1
		);
	  }
	}
  
	if (interaction.customId == "close_ticket_button") {
	  interaction.channel.delete();
	}
})