const Discord = require ("discord.js");

module.exports = {
    name : "radio",
    aliases : [],
    usage: "",
    ownerOnly: false,
    userPermissions: [],
    botPermissions: [],
    async execute(client, message, args) {
        let embed = new Discord.MessageEmbed()

        embed.setTitle(message.translate.general.radio.title)
        embed.setFooter(client.config.footer)
        embed.setTimestamp()
        embed.setColor(client.config.color)
        client.bots.radio.forEach(async(r, i) => {
            i++;

            embed.addField(r.type, message.translate.general.radio.field(r))
        });

        await message.channel.send(embed)
        client.emit("radioUpdate")
    }
}
