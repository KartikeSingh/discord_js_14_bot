const { CommandInteraction } = require("discord.js")
const { default: ms } = require('ms-prettify');

module.exports = {
    data: {
        name: "collect-interaction",
        description: "A simple interaction collector program",
        options: [{
            name: "time",
            type: 3,
            description: "Time to wait for",
        }, {
            name: "max",
            type: 4,
            description: "Maximum interactions to collect",
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
                from === 0 ? (int) => int.user.id === interaction.user.id
                    : from === 1 ? int => int.user.bot
                        : int => true,
            options = { filter };

        if (max) options.max = max;
        if (time) options.time = time;

        const col = interaction.channel.createMessageComponentCollector(options);

        col.on('collect', (m) => {
            console.log("Successfully Collected", m);

            if (m.content === "--x") col.stop("Special End 1");
            if (m.content === "--z") col.stop({ interaction: "Special End 2" });
        });

        col.on('ignore', (m) => {
            console.log("Invalid Collection (Ignored)", m)
        });

        col.on('end', (collectedinteractions, reason) => { console.log("Collection Ended, Number of interactions collected " + collectedinteractions.size, reason) });
    }
}