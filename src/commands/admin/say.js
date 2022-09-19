const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: {
        name: "say",
        description: "say stuff",
        options: [{
            name: "stuff",
            type: 3,
            description: "the stuff to say",
            required: true,
        }],
    },
    timeout: 100,

    run: async (client, interaction) => {
        await interaction.reply({ ephemeral: true, embeds: [new EmbedBuilder().setTitle("Okay! I'll Say It")] });
        
        interaction.channel.send({ content: interaction.options.getString("stuff") });
    }
}