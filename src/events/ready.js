const updateAllStats = require("../utility/updateAllStats");

module.exports = async (client) => {
    console.log(`${client.user.tag} is online!`);

    client.application.commands.set(client.commands.map(v => v.data)).then(cmds => {
        cmds.toJSON().forEach(cmd => {
            const rawCommand = client.commands.get(cmd.name);

            rawCommand.id = cmd.id;

            client.commands.set(cmd.name, rawCommand);
        })
    });

    updateAllStats(client);
}
