const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config');
const loadCommands = require('./handlers/commands');
const loadComponents = require('./handlers/components');
const loadEvents = require('./handlers/events');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.components = new Collection();

loadCommands(client);
loadComponents(client);
loadEvents(client);

client.login(token);
