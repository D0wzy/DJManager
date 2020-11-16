
const Discord = require("discord.js")
const f = require('../bots.json')

module.exports = {
    name: "nowplaying",
    aliases: ["np"],
    usage: ``,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: [],
    async execute(client, message, args) {
    //If the member is not in a voice channel
    if(!message.member.voice.channel) return message.channel.send(message.translate.error(null, "notInVoiceChannel"));

    //If there's no music
    if(!client.player.isPlaying(message.guild.id)) return message.channel.send(message.translate.error(null, "notPlaying"));

    const song = await client.player.nowPlaying(message.guild.id);

    //Message
    message.channel.send(message.translate.music.nowplaying.nowPlaying(song, message, client));
    }
}
