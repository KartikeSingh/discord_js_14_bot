const { EmbedBuilder } = require("discord.js");

const page = require('discord-pagination-advanced');

module.exports = {
    data: {
        name: "help",
        description: "Get some help bro",
        options: [{
            name: "menu",
            type: 1,
            description: "Get the help menu",
        }],
    },
    timeout: 3000,

    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const option = interaction.options.getSubcommand();

        if (option === "menu") {
            const pages = [], cmds = client.commands.toJSON(), max = 5;

            for (let i = 0; i < cmds.length; i++) {
                const ind = Math.floor(i / max),
                    string = `\`${i + 1}.\` </${cmds[i].data.name + ":" + cmds[i].id}>\n> ${cmds[i].data.description}`;

                pages[ind] ? pages[ind].data.description += `\n\n${string}` : pages[ind] = new EmbedBuilder()
                    .setTitle("📋 Help Menu")
                    .setDescription(string)
                    .setColor("Random")
            }

            page(interaction, pages, { deleteMessage: false })
        }
    }
}