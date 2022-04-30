
require('dotenv').config();
const channelID = ''; //channelID to watch
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const discord = require('discord.js');

const client = new discord.Client({intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"]});

//get channel 
const targetChannel = client.channels.cache.get(channelID);

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
})

client.on("message", msg => {
    if(msg.content === 'ping') {
        msg.reply("pong");
    }
})
client.on('voiceStateUpdate', (oldState, newState) => {
    console.log(newState);
    console.log(newState.id)
    console.log(newState.name)
    const targetChannel = client.channels.cache.get('969767903027163196');
    if(!targetChannel) console.log("Failed to find channel");
    if(targetChannel) console.log("Found target channel");
    if(targetChannel.full){ 
        console.log("full");
    } else {
        console.log("joinable")
    }
})
//const targetChannel = client.channels.cache.find(channel => channel.name === "SpMsgChat");


client.login(process.env.DISCORD_BOT_TOKEN);
const commands = [{
    name: 'ping',
    description: 'Replies with a pong'
}];

const rest = new REST({ version: '9'}).setToken('tokenhere');

(async() => {
    try{
        console.log('Discord bot is now listening in shadows twilight');

        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            {
                body: commands
            },
        );
    } catch(error) { console.log(`Error! Error backtrace: ${error}`);
}
})();

function checkChannel(){


}