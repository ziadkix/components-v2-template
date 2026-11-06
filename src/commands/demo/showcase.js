const {
  SlashCommandBuilder,
  SectionBuilder,
  ButtonBuilder,
  ButtonStyle,
  MediaGalleryBuilder,
  MediaGalleryItemBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder
} = require('discord.js');
const { text, divider, card, payload } = require('../../utils/v2');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('showcase')
    .setDescription('see every Components V2 piece in one message'),

  async execute(interaction, client) {
    const section = new SectionBuilder()
      .addTextDisplayComponents(
        text('### Section with a button'),
        text('The button sits on the side, right where a thumbnail would go.')
      )
      .setButtonAccessory(
        new ButtonBuilder()
          .setCustomId('showcase:press')
          .setLabel('Press')
          .setStyle(ButtonStyle.Primary)
      );

    const gallery = new MediaGalleryBuilder().addItems(
      new MediaGalleryItemBuilder()
        .setURL(client.user.displayAvatarURL({ size: 512 }))
        .setDescription('the bot avatar')
    );

    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('showcase:success').setLabel('Success').setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId('showcase:danger').setLabel('Danger').setStyle(ButtonStyle.Danger),
      new ButtonBuilder().setLabel('Docs').setStyle(ButtonStyle.Link).setURL('https://discord.js.org')
    );

    const select = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('showcase:pick')
        .setPlaceholder('choose a component')
        .addOptions(
          ['Text Display', 'Section', 'Container', 'Separator', 'Media Gallery', 'Thumbnail'].map(name => ({
            label: name,
            value: name
          }))
        )
    );

    const view = card()
      .addTextDisplayComponents(text('## Components V2 showcase'))
      .addSeparatorComponents(divider())
      .addSectionComponents(section)
      .addSeparatorComponents(divider())
      .addMediaGalleryComponents(gallery)
      .addSeparatorComponents(divider())
      .addActionRowComponents(buttons)
      .addActionRowComponents(select);

    await interaction.reply(payload([view]));
  }
};
