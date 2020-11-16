const Discord = require ("discord.js")

module.exports = {
    name : "setfooter",
    aliases : [],
    usage: "<footer>",
    ownerOnly: false,
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["ADMINISTRATOR"],
    async execute(client, message, args) {
        if(!args[0]) return message.channel.send(message.translate.error(this, "args"))
        
        client.config.footer = args.join(" ")
        client.config.save({
            space: 3,
            //replacer: 3
        })
        message.channel.send(message.translate.admin.setfooter.success(client.config.footer)).then(async(msg) => {
            msg.delete({
                timeout: 5000
            })
        })
    }
}
