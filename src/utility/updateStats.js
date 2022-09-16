const { Client, ChannelType } = require("discord.js");

/**
 * 
 * @param {Client} client 
 * @param {*} data 
 * @returns 
 */
module.exports = async (client, data) => {
    const channel = await client.channels.fetch(data.id).catch(e => null);

    if (!channel || !channel.setName || !channel.manageable) return;

    const count = [channel.guild.roles.cache.size, channel.guild.channels.cache.size, channel.guild.memberCount],
        newName = data.format.replace(/\{number\}/ig, count[data.type]);

    if (newName !== channel.name) await channel.setName(newName, "Updating Stats")
        .catch((e) => console.log(e))
}