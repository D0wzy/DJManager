const { triggerAsyncId } = require("async_hooks")
const Discord = require("discord.js")

module.exports = async(client) => {

    const translator = require(`../language/${client.config.language}`)

    const embed = new Discord.MessageEmbed()
    embed.setColor(client.config.color)
    embed.setTimestamp()
    embed.setDescription(translator.musicstatus.status.description)
    embed.setTitle(translator.musicstatus.status.title)
    embed.setFooter(client.config.footer)
    client.bots.music.forEach(async(r, i) => {
        embed.addField(`${client.users.cache.get(r.id).tag}`, translator.musicstatus.status.field(r))
    });

    //client.guilds.cache.get(client.config.guild).channels.cache.get(client.config.status.channel).messages.cache.get(client.config.status.message).edit(embed)
    let msg = await client.guilds.cache.get(client.config.guild).channels.cache.get(client.config.music.status.channel).messages.fetch(client.config.music.status.message)
    if(msg) await msg.edit(" ", embed)

    const reactionEmoji = msg.guild.emojis.cache.find(emoji => emoji.name === 'valide');
	//msg.react(reactionEmoji);
}