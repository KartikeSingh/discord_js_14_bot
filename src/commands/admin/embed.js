const { EmbedBuilder, CommandInteraction, ChannelType } = require("discord.js");

module.exports = {
    data: {
        name: "embed",
        description: "Create a embed",
        options: [{
            name: "channel",
            type: 7,
            description: "Channel where you want to send the embed",
            required: true,
            channelTypes: [0, 5], // [ChannelType.GuildText, ChannelType.GuildNews]
        }, {
            name: "title",
            type: 3,
            description: "Title of the embed",
        }, {
            name: "title-url",
            type: 3,
            description: "Url of embed's Title",
        }, {
            name: "description",
            type: 3,
            description: "Description of the embed",
        }, {
            name: "image",
            type: 3,
            description: "Image of the embed",
        }, {
            name: "thumbnail",
            type: 3,
            description: "Thumbnail of the embed",
        }, {
            name: "author",
            type: 6,
            description: "Author of the embed",
        }, {
            name: "color",
            type: 3,
            description: "Color of the embed",
        }, {
            name: "footer-text",
            type: 3,
            description: "Footer text of the embed",
        }, {
            name: "footer-icon",
            type: 3,
            description: "Footer icon of the embed",
        }],
    },
    timeout: 5000,
    permissions: ["ManageGuild"],

    /**
     * 
     * @param {*} client 
     * @param {CommandInteraction} interaction 
     * @returns 
     */
    run: async (client, interaction) => {
        const channel = interaction.options.getChannel("channel"),
            title = interaction.options.getString("title"),
            titleUrl = interaction.options.getString("title-url"),
            description = interaction.options.getString("description"),
            image = interaction.options.getString("image"),
            thumbnail = interaction.options.getString("thumbnail"),
            color = interaction.options.getString("color"),
            footerText = interaction.options.getString("footer-text"),
            footerIcon = interaction.options.getString("footer-icon"),
            author = interaction.options.getUser("author");

        if (!title && !thumbnail && !description && !image && !color && !footerIcon && !footerText && !author) return interaction.reply({
            embeds: [
                new EmbedBuilder({
                    title: "❌ At Least Provide One Text/Image Option"
                })
            ]
        });

        await interaction.reply({
            embeds: [
                new EmbedBuilder({
                    title: "📤 Sending Embed"
                }).setColor("Yellow")
            ]
        })

        channel.send({
            embeds: [
                new EmbedBuilder({
                    title,
                    thumbnail: {
                        url: thumbnail
                    },
                    image: {
                        url: image
                    },
                    description,
                    footer: {
                        text: footerText,
                        icon: footerIcon
                    },
                    url: titleUrl,
                    author: {
                        name: author?.username,
                        iconURL: author ? author.displayAvatarURL({ dynamic: true }) : null,
                        url: author ? author.displayAvatarURL({ dynamic: true }) : null,
                    },
                }).setColor(color)
            ]
        }).then(m => {
            interaction.editReply({
                embeds: [
                    new EmbedBuilder({
                        title: "✅ Message Sent",
                        description: `Jump to the [Message](${m.url})`,
                        }).setColor("DarkGreen")
                ]
            })
        }).catch(e => {
            interaction.editReply({
                embeds: [
                    new EmbedBuilder({
                        title: "❌ Unable To Send Message",
                        description: `Probably I do not have permissions to send the message, Error logs:\n\`\`\`cmd\n${e}\n\`\`\``
                    }).setColor("DarkRed")
                ]
            })
        })
    }
}