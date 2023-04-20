const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder } = require('discord.js');
const fetch = require("node-fetch");

const data = new ContextMenuCommandBuilder()
	.setName('Insult User')
	.setType(ApplicationCommandType.User);
async function getInsult(){
    const res = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json');
    const json = await res.json();
    return json.insult;
}
function getRandomHexColor() {
  let hexColor;
  do {
    hexColor = Math.floor(Math.random() * 16777216).toString(16); // Generate a random integer between 0 and 16777215 and convert it to hex string
  } while (hexColor.length < 6 || hexColor.length > 6 || !/^[0-9a-fA-F]+$/.test(hexColor)); // Check if the hex string is exactly 6 characters long and consists of only valid hex characters
  return "#" + hexColor;
}
module.exports = {
  data,
  async execute(interaction) {
    const { username } = interaction.targetUser;
    const insult = await getInsult();
    //dm the user the insult
    await interaction.targetUser.send(`${username}, ${insult}`);
    //reply to the interaction
    await interaction.reply({
      content: `Sent ${username} the insult: "${insult}"`,
      ephemeral: true
    }).then(() => {
      //post the insult in the bot log channel
      const botLogChannel = interaction.guild.channels.cache.find(channel => channel.name === 'spmsglog');
      
      //generate random hex color
      const randomColor = getRandomHexColor();
      const embed = new EmbedBuilder()
        .setColor(`#${randomColor}`)
        .setTitle('Insult Sent')
        .addFields({
          name: 'Initiated by',
          value: `@${interaction.user.username}`,
          inline: true
        }, {
          name: 'Sent to',
          //link to the user
          value: `@${username}`,
          inline: true
        }, {
          name: 'Insult',
          value: `${insult}`,
          inline: false
        },)
        //set iconURL to the bots avatar
        .setAuthor({
          name: "SpMsgBot",
          iconURL: interaction.client.user.avatarURL()
        }).setTimestamp();
  
        botLogChannel.send({ embeds: [embed]});
    });
    }
};