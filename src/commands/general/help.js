const { SlashCommandBuilder } = require('discord.js');
const { payload } = require('../../utils/v2');
const buildHelp = require('../../utils/helpView');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('list everything the bot can do'),

  async execute(interaction, client) {
    await interaction.reply(payload([buildHelp(client)], true));
  }
};
