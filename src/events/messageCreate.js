const { EmbedBuilder } = require('discord.js');
const afk = require("../models/afk");

module.exports = async (client, message) => {
    if (!message.guild || message.author.bot) return;

    const authorData = await afk.findOne({ afk: true, user: message.author.id });

    if (authorData?.afk && Date.now() - authorData.since > 5000) {
        message.reply({
            embeds: [
                new EmbedBuilder({
                    title: "AFK Removed",
                    description: `You are no longer AFK\nWhile you were AFK you were mentioned \`${authorData.mentions}\` times`
                }).setColor("Random")
            ]
        });

        await afk.findOneAndUpdate({ user: message.author.id }, { afk: false, mentions: 0 });
    }

    message.mentions.users.filter(u => !u.bot && u.id !== message.author.id).forEach(async user => {
        const data = await afk.findOne({ afk: true, user: user.id });

        if (!data) return;

        message.reply({
            embeds: [
                new EmbedBuilder({
                    title: `${user.username} is AFK`,
                    description: `Reason: \`${data.reason}\`\nAFK Since: <t:${Math.floor(data.since / 1000)}:d>`
                }).setColor("Random")
            ]
        });

        await afk.findOneAndUpdate({ user: user.id }, { $inc: { mentions: 1 } });
    })
}