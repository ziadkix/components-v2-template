require('dotenv').config();

const required = ['TOKEN', 'CLIENT_ID'];
const missing = required.filter(key => !process.env[key]);

if (missing.length) {
  console.error(`you forgot to set ${missing.join(' and ')} in your .env`);
  process.exit(1);
}

module.exports = {
  token: process.env.TOKEN,
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID || null,
  color: 0x5865f2
};
