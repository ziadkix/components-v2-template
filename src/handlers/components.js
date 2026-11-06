const fs = require('fs');
const path = require('path');

module.exports = client => {
  const dir = path.join(__dirname, '..', 'components');
  const files = fs.readdirSync(dir).filter(name => name.endsWith('.js'));

  for (const file of files) {
    const component = require(path.join(dir, file));
    client.components.set(component.id, component);
  }
};
