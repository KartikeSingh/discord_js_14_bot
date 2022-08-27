const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: {
        name: "click",
        description: "Simple click game",
        options: [],
    },
    timeout: 3000,

    run: async (client, interaction) => {
        const msg = await interaction.reply({
            fetchReply: true,
            embeds: [new EmbedBuilder({
                title: "Select the correct button"
            }).setColor("Random")],

            components: [
                new ActionRowBuilder({
                    components: [
                        new ButtonBuilder({
                            customId: "1",
                            label: "Green",
                            emoji: "😁",
                            style: ButtonStyle.Success,
                        }),
                        new ButtonBuilder({
                            customId: "2",
                            label: "Red",
                            style: ButtonStyle.Danger
                        }),
                        new ButtonBuilder({
                            customId: "3",
                            label: "Blue",
                            style: ButtonStyle.Primary
                        }),
                        new ButtonBuilder({
                            customId: "4",
                            label: "Grey",
                            style: ButtonStyle.Secondary
                        }),
                        new ButtonBuilder({
                            label: "URL",
                            style: ButtonStyle.Link,
                            disabled:true,
                            url: "https://cdn.discordapp.com/attachments/1010105250830635038/1010107384556957776/IMG_0905.png"
                        })
                    ]
                })]
        });

        const col = msg.createMessageComponentCollector({
            filter: i => i.user.id === interaction.user.id,
            time: 10000
        });

        const w = Math.floor(Math.random() * (4 - 1) + 1);

        col.on('ignore', (i) => i.reply({
            ephemeral: true,
            embeds: [new EmbedBuilder({
                title: "You Are not allowed"
            }).setColor("Red")]
        }));

        col.on('collect', (i) => {
            const win = i.customId == w;
            const buttonNames = ["Green Byutton", "red", "Blue", "grey", "urlF"]

            i.reply({
                ephemeral: true,
                embeds: [
                    new EmbedBuilder({
                        title: win ? "You Won" : "You lost",
                        description: `You clicked on ${buttonNames[parseInt(i.customId) - 1]}`
                    })
                ]
            })
        });

        col.on('end', (collected, reason) => msg.edit({ components: [] }));
    }
}