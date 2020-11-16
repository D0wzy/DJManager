const Discord = require("discord.js")
const f = require('../bots.json')

module.exports = {
    name: "resume",
    aliases: [],
    usage: ``,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: [],
    async execute(client, message, args) {
        //If the member is not in a voice channel
        if (!message.member.voice.channel) return message.channel.send(message.translate.error(null, "notInVoiceChannel"));

        //Get song
        const song = await client.player.resume(message.guild.id);

        //If there's no music
        if (!song) return message.channel.send(message.translate.error(null, "notPlaying"));


        //Message
        message.channel.send(message.translate.music.resume.resume(song));
    }
}