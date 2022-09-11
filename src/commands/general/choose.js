const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: {
        name: "choose",
        description: "Ask me to choose something",
        options: [{
            name: "choices",
            type: 3,
            description: "all the choices, seprate them via  |",
            required: true,
        }],
    },
    timeout: 2000,

    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const choices = interaction.options.getString("choices").split(/\s*\|\s*/);

        if (choices.length < 2) return interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("❌ At Least Give Two Choices")
                    .setColor("DarkRed")
            ]
        });

        interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setColor("Random")
                    .setDescription(`I choose \`${choices[Math.floor(Math.random() * choices.length)]}\``)
            ]
        });
    }
}