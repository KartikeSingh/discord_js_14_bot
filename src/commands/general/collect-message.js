const { CommandInteraction } = require("discord.js")
const { default: ms } = require('ms-prettify');

module.exports = {
    data: {
        name: "collect-message",
        description: "A simple message collector program",
        options: [{
            name: "time",
            type: 3,
            description: "Time to wait for",
        }, {
            name: "max",
            type: 4,
            description: "Maximum messages to collect",
            minValue: 1
        }, {
            name: "from",
            type: 4,
            description: "Take input from whom?",
            choices: [{
                name: "Yourself",
                value: 0
            }, {
                name: "Bots",
                value: 1
            }, {
                name: "Everyone",
                value: 2
            }]
        }],
    },
    timeout: 1000,

    /**
     * 
     * @param {*} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        await interaction.reply({
            embeds: [{
                title: "Check Console"
            }]
        });

        const max = interaction.options.getInteger("max"),
            time = ms(interaction.options.getString("time") || "0"),
            from = interaction.options.getInteger("from"),
            filter =
                from === 0 ? (msg) => msg.author.id === interaction.user.id
                    : from === 1 ? msg => msg.author.bot
                        : msg => true,
            options = { filter };

        if (max) options.max = max;
        if (time) options.time = time;

        const col = interaction.channel.createMessageCollector(options);

        col.on('collect', (m) => {
            console.log("Successfully Collected", m);

            if (m.content === "--x") col.stop("Special End 1");
            if (m.content === "--z") col.stop({ message: "Special End 2" });
        });

        col.on('ignore', (m) => {
            console.log("Invalid Collection (Ignored)", m)
        });

        col.on('end', (collectedMessages, reason) => { console.log("Collection Ended, Number of messages collected " + collectedMessages.size, reason) });
    }
}