const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { text, divider, card } = require('./v2');

module.exports = (client, selected) => {
  const categories = [...new Set(client.commands.map(command => command.category))];
  const current = categories.includes(selected) ? selected : categories[0];

  const list = client.commands
    .filter(command => command.category === current)
    .map(command => `**/${command.data.name}** - ${command.data.description}`)
    .join('\n');

  const menu = new StringSelectMenuBuilder()
    .setCustomId('help:category')
    .setPlaceholder('pick a category')
    .addOptions(
      categories.map(name => ({
        label: name[0].toUpperCase() + name.slice(1),
        value: name,
        default: name === current
      }))
    );

  return card()
    .addTextDisplayComponents(text('## Help'))
    .addSeparatorComponents(divider())
    .addTextDisplayComponents(text(list))
    .addSeparatorComponents(divider())
    .addActionRowComponents(new ActionRowBuilder().addComponents(menu));
};
