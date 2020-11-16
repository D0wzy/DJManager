const Discord = require ("discord.js")

module.exports = {
    name : "lock",
    aliases : [],
    usage: "<id / username / tag>",
    ownerOnly: false,
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["ADMINISTRATOR"],
    async execute(client, message, args) {

        if(!args[0]) return message.channel.send(message.translate.error(this, "args"))

        if (args[0]) {
            member = message.guild.member(args[0]);
        }
        if (message.mentions.members.first()) {
            member = message.guild.member(message.mentions.members.first().id);
        } else {
            return message.channel.send(message.translate.error(this, "args"))
        }

        if(!client.bots.radio.find(x=> x.id == member.user.id)) {
            return message.channel.send(message.translate.error(this, "args"))
        } else {
            let r = client.bots.radio.find(x => x.id == member.user.id)
            if(!r) return message.channel.send(message.translate.error(this, "args"))

            r.locked = true
            client.bots.save({
                space: 3,
                //replacer: 3
            })
            message.channel.send(message.translate.admin.lock.success(r.type))
        }
    }
}
