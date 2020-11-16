
const Discord = require("discord.js")

module.exports = {
    name : "clear-queue",
    aliases : [],
    usage: "",
    ownerOnly: false,
    userPermissions: [],
    botPermissions: [],
    async execute(client, message, args) {

    if(!message.member.voice.channel) return message.channel.send(message.translate.error(null, "notInVoiceChannel"));

    //If there's no music
    if(!client.player.isPlaying(message.guild.id)) return message.channel.send(message.translate.error(null, "notPlaying"))

    //The bot removes the waiting list
    client.player.clearQueue(message.guild.id);

    const queue = client.player.getQueue(message.guild.id);
    //Success message
    message.channel.send(message.translate.music['clear-queue'].success(queue.tracks.length));
    }
}
