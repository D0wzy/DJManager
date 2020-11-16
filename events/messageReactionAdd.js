const Discord = require("discord.js")

module.exports = (client, reaction, user) => {
    if (reaction.message.channel.id !== client.config.music.status.channel) return;

    reaction.users.remove(user);

    let translator = require(`../language/${client.config.language}`)


    if (!reaction.message.guild.member(user.id).voice.channel) return reaction.message.channel.send(translator.error(null, "notInVoiceChannel",  {
        mentionUser: true,
        user: user
    })).then(async(m) => {
        m.delete({
            timeout: 5000
        })
    })

    let m = client.bots.music.find(x => !x.used)

    if (!m) return  reaction.message.channel.send(translator.error(null, "noAvaibleBot",  {
        mentionUser: true,
        user: user
    })).then(async(m) => {
        m.delete({
            timeout: 5000
        })
    })

    client.makeJoin(m.id, reaction.message.guild.member(user.id).voice.channel.id)
}