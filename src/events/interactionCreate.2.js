const { Interaction, EmbedBuilder } = require('discord.js');
const afk = require('../models/afk');

/**
 * 
 * @param {*} client 
 * @param {Interaction} interaction 
 */
module.exports = async (client, interaction) => {
    if (!interaction.isModalSubmit()) return;

    const reason = interaction.fields.getTextInputValue("afk_reason");

    await afk.findOneAndUpdate({ id: interaction.user.id }, { afk: true, since: Date.now(), reason }) || await afk.create({ id: interaction.user.id, afk: true, since: Date.now(), reason });

    interaction.reply({
        ephemeral: true,
        embeds: [new EmbedBuilder({
            title: "You Are Now AFK",
            description: `Reason: \n\`${reason}\``
        })]
    })
}