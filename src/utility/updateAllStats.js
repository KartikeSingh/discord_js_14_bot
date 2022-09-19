const statsChannels = require("../models/statsChannels")
const updateStats = require("./updateStats")

module.exports = async function updateAllstats(client) {
    const guilds = [...client.guilds.cache];

    for (let i = 0; i < guilds.length; i++) {
        const channels = await statsChannels.find({ guild: guilds[i][0] });

        for (let j = 0; j < channels.length; j++) updateStats(client, channels[j]);
    }

    setTimeout(() => updateAllstats(client), 300000);
}