const Discord = require("discord.js")
const f = require('../bots.json')

module.exports = {
    name: "volume",
    aliases: [],
    usage: `<volume>`,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: [],
    async execute(client, message, args) {
        //If the member is not in a voice channel
        if (!message.member.voice.channel) return message.channel.send(message.translate.error(null, "notInVoiceChannel"));

        //If there's no music
        if (!client.player.isPlaying(message.guild.id)) return message.channel.send(message.translate.error(null, "notPlaying"));

        //Args
        if (!args[0]) return message.channel.send(message.translate.error(this, "args", {
            prefix: "-"
        }))

        if(isNaN(parseInt(args[0]))) return message.channel.send(message.translate.error(this, "args", {
            prefix: "-"
        }))
        //Set volume
        client.player.setVolume(message.guild.id, parseInt(args[0]));

        //Message
        message.channel.send(message.translate.music.volume.success(args[0]));
    }
}