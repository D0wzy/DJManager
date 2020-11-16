const Discord = require ("discord.js")

module.exports = {
    name : "setprefix",
    aliases : [],
    usage: "<prefix>",
    ownerOnly: true,
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["ADMINISTRATOR"],
    async execute(client, message, args) {
        if(!args[0]) return message.channel.send(message.translate.error(this, "args"))
        
        client.config.prefix = args[0]
        client.config.save({
            space: 3,
            //replacer: 3
        })

        client.user.setActivity(`💎・Bulgari | ${client.config.prefix}help`);
        
        message.channel.send(message.translate.admin.setprefix.success(client.config.prefix)).then(async(msg) => {
            msg.delete({
                timeout: 5000
            })
        })
    }
}
