const { text, card, payload } = require('../utils/v2');

module.exports = {
  id: 'showcase',

  async execute(interaction) {
    const [, action] = interaction.customId.split(':');

    const message = interaction.isStringSelectMenu()
      ? `you picked **${interaction.values[0]}**`
      : `you hit the **${action}** button`;

    await interaction.reply(payload([card().addTextDisplayComponents(text(message))], true));
  }
};
