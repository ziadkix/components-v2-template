const { Events } = require('discord.js');
const { text, card, payload } = require('../utils/v2');

async function fail(interaction) {
  const message = payload(
    [card(0xed4245).addTextDisplayComponents(text('something broke while running that, try again in a bit'))],
    true
  );

  if (interaction.replied || interaction.deferred) {
    return interaction.followUp(message).catch(() => {});
  }

  return interaction.reply(message).catch(() => {});
}

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    try {
      if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (command) await command.execute(interaction, client);
        return;
      }

      if (interaction.isMessageComponent() || interaction.isModalSubmit()) {
        const [id] = interaction.customId.split(':');
        const component = client.components.get(id);
        if (component) await component.execute(interaction, client);
      }
    } catch (error) {
      console.error(`${interaction.commandName || interaction.customId} crashed:`, error);
      await fail(interaction);
    }
  }
};
