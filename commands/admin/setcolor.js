const Discord = require("discord.js")

module.exports = {
    name: "setcolor",
    aliases: [],
    usage: "<color>",
    ownerOnly: false,
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["ADMINISTRATOR"],
    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(message.translate.error(this, "args"))

        client.config.color = args[0]
        client.config.save({
            space: 3,
            //replacer: 3
        })
        message.channel.send(message.translate.admin.setcolor.success(client.config.color)).then(async (msg) => {
            msg.delete({
                timeout: 5000
            })
        })
    }
}