const { REST, Routes } = require('discord.js');
const { token, clientId, guildId } = require('../src/config');
const getFiles = require('../src/utils/commandFiles');

const body = getFiles().map(file => require(file).data.toJSON());
const rest = new REST().setToken(token);

const route = guildId
  ? Routes.applicationGuildCommands(clientId, guildId)
  : Routes.applicationCommands(clientId);

rest
  .put(route, { body })
  .then(data => console.log(`registered ${data.length} commands ${guildId ? 'in your test server' : 'globally'}`))
  .catch(error => {
    console.error('deploy failed:', error);
    process.exit(1);
  });
