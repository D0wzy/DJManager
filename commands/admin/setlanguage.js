const Discord = require ("discord.js")

module.exports = {
    name : "setlanguage",
    aliases : [],
    usage: "<fr / en>",
    ownerOnly: false,
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["ADMINISTRATOR"],
    async execute(client, message, args) {
        if(!args[0]) return message.channel.send(message.translate.error(this, "args"))

        if(args[0] !== "fr" || args[0] !== "en") return message.channel.send(message.translate.error(this, "args"))
        
        client.config.language = args[0]
        client.config.save({
            space: 3,
            //replacer: 3
        })
        message.channel.send(message.translate.admin.setprefix.success(client.config.language)).then(async(msg) => {
            msg.delete({
                timeout: 5000
            })
        })
    }
}
