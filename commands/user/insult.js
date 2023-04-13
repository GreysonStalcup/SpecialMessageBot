const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

const data = new ContextMenuCommandBuilder()
	.setName('Insult User')
	.setType(ApplicationCommandType.User);
async function getInsult(){
    const res = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json');
    const json = await res.json();
    return json.insult;
}
module.exports = {
  data,
  async execute(interaction) {
    const { username } = interaction.targetUser;
    const insult = await getInsult();
    //dm the user the insult
    await interaction.targetUser.send(`${username}, ${insult}`);
    //reply to the interaction
    await interaction.reply(`Sent ${username} the insult: "${insult}"`);
    }
};