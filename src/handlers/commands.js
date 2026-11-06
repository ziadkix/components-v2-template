const path = require('path');
const getFiles = require('../utils/commandFiles');

module.exports = client => {
  for (const file of getFiles()) {
    const command = require(file);

    if (!command.data || !command.execute) {
      console.warn(`skipping ${path.basename(file)}, it has no data or execute`);
      continue;
    }

    command.category = path.basename(path.dirname(file));
    client.commands.set(command.data.name, command);
  }
};
