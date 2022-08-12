const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: {
        name: "ping",
        description: "Just ping me",
        options: [],
    },
    timeout: 3000,

    run: async (client, interaction) => {
        const embed = new EmbedBuilder({
            title: `🏓 My Ping is ${client.ws.ping}`,
        }).setColor("Random");

        interaction.reply({
            embeds: [embed]
        })
    }
}