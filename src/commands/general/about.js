const { SlashCommandBuilder, SectionBuilder, ThumbnailBuilder, version } = require('discord.js');
const { text, divider, card, payload } = require('../../utils/v2');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('some info about the bot'),

  async execute(interaction, client) {
    const startedAt = Math.floor((Date.now() - client.uptime) / 1000);

    const header = new SectionBuilder()
      .addTextDisplayComponents(
        text(`## ${client.user.username}`),
        text('Running on the Components V2 template')
      )
      .setThumbnailAccessory(
        new ThumbnailBuilder().setURL(client.user.displayAvatarURL({ size: 256 }))
      );

    const stats = [
      `**Servers:** ${client.guilds.cache.size}`,
      `**Online since:** <t:${startedAt}:R>`,
      `**discord.js:** ${version}`,
      `**Node:** ${process.version}`
    ].join('\n');

    const view = card()
      .addSectionComponents(header)
      .addSeparatorComponents(divider())
      .addTextDisplayComponents(text(stats));

    await interaction.reply(payload([view]));
  }
};
