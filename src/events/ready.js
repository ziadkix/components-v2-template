const { Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(readyClient) {
    console.log(`${readyClient.user.tag} is up and running`);
  }
};
