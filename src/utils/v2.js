const {
  ContainerBuilder,
  TextDisplayBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  MessageFlags
} = require('discord.js');
const { color } = require('../config');

const text = content => new TextDisplayBuilder().setContent(content);

const divider = (spacing = SeparatorSpacingSize.Small) =>
  new SeparatorBuilder().setDivider(true).setSpacing(spacing);

const card = (accent = color) => new ContainerBuilder().setAccentColor(accent);

const payload = (components, ephemeral = false) => ({
  components,
  flags: ephemeral
    ? MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
    : MessageFlags.IsComponentsV2
});

module.exports = { text, divider, card, payload };
