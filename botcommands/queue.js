const Discord = require("discord.js")
const f = require('../bots.json')

module.exports = {
    name: "queue",
    aliases: [],
    usage: `<musique>`,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: [],
    async execute(client, message, args) {
    //If the member is not in a voice channel
    if (!message.member.voice.channel) return message.channel.send(message.translate.error(null, "notInVoiceChannel"));

    //Get queue
    const queue = client.player.getQueue(message.guild.id);

    //If there's no music
    if(!queue) return message.channel.send(message.translate.error(null, "notPlaying"));

    //Message
    message.channel.send(message.translate.music.queue.queue(queue))
    }
}
