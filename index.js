
require('dotenv').config();
const fs = require('fs');
const channelID = ''; //channelID to watch
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const discord = require('discord.js');
const config = require("./config.json");

const client = new discord.Client({intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"]});

//get channel 
const targetChannel = client.channels.cache.get(channelID);

function getInsult(){
    


}
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
})

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
        insultArray = insultArray[randomNumber];
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


client.login(process.env.DISCORD_BOT_TOKEN);
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

