const buildHelp = require('../utils/helpView');

module.exports = {
  id: 'help',

  async execute(interaction, client) {
    if (!interaction.isStringSelectMenu()) return;
    await interaction.update({ components: [buildHelp(client, interaction.values[0])] });
  }
};
