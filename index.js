
require('dotenv').config();
const fs = require('fs');
const path = require('node:path');
const channelID = ''; //channelID to watch
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Collection, Events, GatewayIntentBits, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const Discord = require('discord.js');
const config = require("./config.json");
const token = process.env.DISCORD_BOT_TOKEN;
const client = new Discord.Client(
    {
        // intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"]
        intents: [
            GatewayIntentBits.Guilds, 
            GatewayIntentBits.GuildMessages,
        ]
    }
);

//get channel 
const targetChannel = client.channels.cache.get(channelID);
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
const data = new ContextMenuCommandBuilder()
	.setName('User Information')
	.setType(ApplicationCommandType.User);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
function getInsult(){
    


}
client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isUserContextMenuCommand()) return;
	// Get the User's username from context menu
	const { username } = interaction.targetUser;
	const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }
    try {
        command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }

});
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
})
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});
client.on("message", msg => {

    //if(msg.author.bot) return;

    //if(msg.content.indexOf(config.prefix) !== 0) return;

    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd === 'call') {
        let member = msg.mentions.members.first();
        member.send("Get in chat you bitch!");

    }

    if(msg.content === 'ping') {
        msg.reply("pong");
    } else if (msg.content.toLowerCase() === 'fuck you') {
        msg.reply("NO, FUCK YOU!");
    }
})
client.on('voiceStateUpdate', (oldState, newState) => {
    const targetChannel = client.channels.cache.get('969804063992578058');
    
    
    if(targetChannel.full){ 
        
        console.log("Joined specific channel");
        //kick player from channel
        newState.member.voice.disconnect();
        // @TODO: sleep 5 seconds
       // 
       fs.readFile('assets/insults.txt', 'utf-8', (err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        let insultArray = data.split('\n');
        randomNumber = Math.floor(Math.random() * insultArray.length);
        insultArray = insultArray[randomNumber].toUpperCase();
        newState.member.send(insultArray);
        //Log message
        client.channels.cache.get('972313196113330276').send(`Sent ${newState.member} the insult ${insultArray}`)

        console.log(`sent ${newState.member.nickname} the insult ${insultArray}`)
    })
        
       
    
    } else {
        //do nothing
    }
})
//const targetChannel = client.channels.cache.find(channel => channel.name === "SpMsgChat");


client.login(token);
//const commands = [{
//    name: 'ping',
//    description: 'Replies with a pong'
//}];





function sendMessage(messageText) {
    try {
       
    
    } catch(err) {
        console.log(err);
        return false
    }
          
    console.log("Sent message");
}

