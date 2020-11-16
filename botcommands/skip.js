const Discord = require("discord.js")
const f = require('../bots.json')

module.exports = {
    name: "skip",
    aliases: [],
    usage: ``,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: [],
    async execute(client, message, args) {
    //If the member is not in a voice channel
    if(!message.member.voice.channel) return message.channel.send(message.translate.error(null, "notInVoiceChannel"));

    //If there's no music
    if(!client.player.isPlaying(message.guild.id)) return message.channel.send(message.translate.error(null, "notPlaying"));

    const track = await client.player.skip(message.guild.id);

    //Message
    message.channel.send(message.translate.music.skip.skip(track));
    }
}