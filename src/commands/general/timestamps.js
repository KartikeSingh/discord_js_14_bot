const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: {
        name: "timestamps",
        description: "Some sample timestamps",
        options: [],
    },
    timeout: 3000,

    run: async (client, interaction) => {
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor("Random")
                    .setTitle("Timestamps")
                    .setDescription(
                        `<t:${Math.floor((Date.now()) / 1000)}:t>\n` +
                        `<t:${Math.floor((Date.now()) / 1000)}:T>\n` +
                        `<t:${Math.floor((Date.now()) / 1000)}:d>\n` +
                        `<t:${Math.floor((Date.now()) / 1000)}:D>\n` +
                        `<t:${Math.floor((Date.now()) / 1000)}:f>\n` +
                        `<t:${Math.floor((Date.now()) / 1000)}:F>\n` +
                        `Giveaway Ends <t:${Math.floor((Date.now() + 1 * 60 * 60 * 1000) / 1000)}:R>\n` +
                        `AFK since <t:${Math.floor((Date.now() - 50000) / 1000)}:R>\n`
                    )
            ]
        })
    }
}