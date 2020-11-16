const { triggerAsyncId } = require("async_hooks")
const Discord = require("discord.js")

module.exports = async(client) => {

    const translator = require(`../language/${client.config.language}`)

    const embed = new Discord.MessageEmbed()
    embed.setColor(client.config.color)
    embed.setTimestamp()
    embed.setTitle(translator.radio.status.title)
    embed.setFooter(client.config.footer)
    client.bots.radio.forEach(async(r, i) => {
        embed.addField(r.type, translator.radio.status.field(r))
    });

    //client.guilds.cache.get(client.config.guild).channels.cache.get(client.config.status.channel).messages.cache.get(client.config.status.message).edit(embed)
    let msg = await client.guilds.cache.get(client.config.guild).channels.cache.get(client.config.status.channel).messages.fetch(client.config.status.message)
    if(msg) await msg.edit(" ", embed)
}