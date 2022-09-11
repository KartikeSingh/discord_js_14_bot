module.exports = {
    data: {
        name: "stats",
        description: "Manage stats channels of your server",
        options: [
            {
                name: "set",
                type: 1,
                description: "Set a channel a stats channel",
                options: [{
                    name: "channel",
                    type: 7,
                    description: "The channel you want to set as a stat channel",
                    required: true,
                }, {
                    name: "type",
                    type: 4,
                    description: "Stats type",
                    required: true,
                    choices: [{
                        name: "Number Of Roles",
                        value: 0
                    }, {
                        name: "Number Of Channels",
                        value: 1
                    }, {
                        name: "Number Of Members",
                        value: 2
                    }]
                }, {
                    name: "format",
                    type: 3,
                    description: "Channel naming format, example: Roles {number}, Channels {number}",
                    required: true,
                }]
            }, {
                name: "remove",
                type: 1,
                description: "Remove a channel from a stat channel mode",
                options: [{
                    name: "channel",
                    type: 7,
                    description: "The channel you want remove from stat channel mode",
                    required: true,
                }]
            }
        ],
    },
    timeout: 3000,

    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true })
    }
}