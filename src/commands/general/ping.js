const { SlashCommandBuilder } = require('discord.js');
const { text, divider, card, payload } = require('../../utils/v2');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('check how fast the bot responds'),

  async execute(interaction, client) {
    const latency = Date.now() - interaction.createdTimestamp;

    const view = card()
      .addTextDisplayComponents(text('## Pong'))
      .addSeparatorComponents(divider())
      .addTextDisplayComponents(
        text(`**Latency:** ${latency}ms\n**API:** ${Math.round(client.ws.ping)}ms`)
      );

    await interaction.reply(payload([view]));
  }
};
