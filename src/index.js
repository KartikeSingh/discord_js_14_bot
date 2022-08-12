require('dotenv').config();

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.timeouts = new Collection();
client.events = readdirSync(join(__dirname, "./events"));
client.categories = readdirSync(join(__dirname, "./commands"));

for (let i = 0; i < client.categories.length; i++) {
    const commands = readdirSync(join(__dirname, `./commands/${client.categories[i]}`));

    for (let j = 0; j < commands.length; j++) {
        const command = require(`./commands/${client.categories[i]}/${commands[j]}`);

        if (!command || !command.run || !command.data) continue;

        command.category = client.categories[i]

        client.commands.set(command.data.name, command);
    }
}

for (let i = 0; i < client.events.length; i++) {
    const event = require(`./events/${client.events[i]}`);

    if (typeof event !== "function") continue;

    client.on(client.events[i].split(".")[0], (...args) => event(client, ...args));
}

client.login(process.env.TOKEN);