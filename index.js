
require('dotenv').config();

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

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