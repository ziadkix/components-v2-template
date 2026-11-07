# Components V2 Bot Template

A small discord.js v14 starter built around Components V2. It comes with a command handler, a deploy script for slash commands, a component handler for buttons, select menus and modals, and a few example commands so you can see how V2 layouts are put together.

## What's inside

- Slash commands get loaded from `src/commands`, and each folder becomes a category in `/help`
- A component handler that picks the right file using the custom id prefix
- Tiny helpers in `src/utils/v2.js` so building containers doesn't take forever
- Example commands: `/ping`, `/about`, `/help` and `/showcase`
- Errors reply with a V2 card instead of the interaction just dying

## Requirements

- Node.js 18 or newer
- A bot application from the [Discord developer portal](https://discord.com/developers/applications)
- discord.js 14.19 or newer, that's where Components V2 landed

## Setup

```bash
git clone https://github.com/ziadkix/components-v2-template.git
cd components-v2-template
npm install
```

Copy `.env.example` to `.env` and fill it in:

```
TOKEN=your bot token
CLIENT_ID=your application id
GUILD_ID=your test server id
```

`GUILD_ID` is optional. If you set it, commands show up in that server right away. Leave it empty to register globally, which can take a while to appear.

Then register the commands and start the bot:

```bash
npm run deploy
npm start
```

Use `npm run dev` if you want it to restart on file changes.

## Adding a command

Drop a file in a folder under `src/commands`. The folder name is the category.

```js
const { SlashCommandBuilder } = require('discord.js');
const { text, card, payload } = require('../../utils/v2');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('flip a coin'),

  async execute(interaction) {
    const side = Math.random() < 0.5 ? 'Heads' : 'Tails';
    const view = card().addTextDisplayComponents(text(`## ${side}`));
    await interaction.reply(payload([view]));
  }
};
```

Run `npm run deploy` again so Discord knows about it.

## Handling buttons, menus and modals

Custom ids look like `id:action:extra`. Whatever comes before the first colon decides which file in `src/components` handles it.

```js
const { MessageFlags } = require('discord.js');

module.exports = {
  id: 'ticket',

  async execute(interaction) {
    const [, action] = interaction.customId.split(':');
    await interaction.reply({ content: action, flags: MessageFlags.Ephemeral });
  }
};
```

A button with the id `ticket:close` ends up in that file with `action` set to `close`.

## Things to know about Components V2

- Messages need the `IsComponentsV2` flag, and `payload()` sets it for you
- With that flag you can't send `content`, embeds, polls or stickers in the same message
- You can't remove the flag from a message once it's sent
- 40 components max per message, nested ones count too
- All text displays in a message share 4000 characters
- A container can hold text displays, sections, separators, media galleries, files and action rows
- A section takes 1 to 3 text displays and exactly one accessory, either a button or a thumbnail

## Structure

```
src
  commands      slash commands, one folder per category
  components    button, select menu and modal handlers
  events        discord.js events
  handlers      loaders for the three folders above
  utils         v2 helpers and shared views
  config.js     env loading
scripts
  deploy.js     registers slash commands
```


## Getting help

If you build something with this template and get stuck, open a [Q&A discussion](https://github.com/ziadkix/components-v2-template/discussions/categories/q-a) with your code snippet and the exact error - questions with repro details usually get answered fast.

This template was put together with pair-testing from [@bsmtk7-hub](https://github.com/bsmtk7-hub) - thanks for the second pair of eyes on the onboarding flow!
## Related

Prefer classic slash commands over V2 components? My other starter: [slash-command-template](https://github.com/ziadkix/slash-command-template)

## License

MIT
