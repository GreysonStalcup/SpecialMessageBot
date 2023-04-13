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
      const randomColor = Math.floor(Math.random()*16777215).toString(16);

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