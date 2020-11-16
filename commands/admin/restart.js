const Discord = require ("discord.js")

module.exports = {
    name : "restart",
    aliases : [],
    usage: "",
    ownerOnly: false,
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["ADMINISTRATOR"],
    async execute(client, message, args) {
        await client.initRadio()

        message.channel.send(message.translate.admin.restart.success())
    }
}
