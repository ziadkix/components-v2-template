const fs = require('fs');
const path = require('path');

module.exports = client => {
  const dir = path.join(__dirname, '..', 'events');
  const files = fs.readdirSync(dir).filter(name => name.endsWith('.js'));

  for (const file of files) {
    const event = require(path.join(dir, file));
    const run = (...args) => event.execute(...args, client);

    if (event.once) client.once(event.name, run);
    else client.on(event.name, run);
  }
};
