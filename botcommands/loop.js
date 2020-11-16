const Discord = require("discord.js")
const f = require('../bots.json')

module.exports = {
    name: "loop",
    aliases: ["repeat"],
    usage: ``,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: [],
    async execute(client, message, args) {
        if(!message.member.voice.channel) return message.channel.send(message.translate.error(null, "notInVoiceChannel"));

        //If there's no music
        if(!client.player.isPlaying(message.guild.id)) return message.channel.send(message.translate.error(null, "notPlaying"));
    
        //Repeat mode
        const repeatMode = client.player.getQueue(message.guild.id).repeatMode;
    
        //If the mode is enabled
        if(repeatMode) {
    
            client.player.setRepeatMode(message.guild.id, false);
    
            //Message
            return message.channel.send(message.translate.music.loop.disable);
    
        //If the mode is disabled
        } else {
    
            client.player.setRepeatMode(message.guild.id, true);
    
            //Message
            return message.channel.send(message.translate.music.loop.enable);
    
        }
    }
}
