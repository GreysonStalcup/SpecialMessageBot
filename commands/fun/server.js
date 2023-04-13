const { SlashCommandBuilder } = require('discord.js');
//get member count that are not bots
function getMemberCount(guild) {
	return guild.members.cache.filter(member => !member.user.bot).size;
}
//get bot counts
function getBotCount(guild) {
	return guild.members.cache.filter(member => member.user.bot).size;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		console.log(interaction.guild.members);
		await interaction.guild.members.fetch();
		const members = getMemberCount(interaction.guild);
		const bots = getBotCount(interaction.guild);
		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply(`This server is ${interaction.guild.name} and has ${members} members & ${bots} bots.`);
	},
};