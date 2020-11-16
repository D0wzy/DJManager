const Discord = require("discord.js")
const f = require('../bots.json')

module.exports = {
    name: "play",
    aliases: ["p"],
    usage: `<musique>`,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: [],
    async execute(client, message, args) {
        if (!message.member.voice.channel) return message.channel.send(message.translate.error(null, "notInVoiceChannel"));
        //If no music is provided
        if (!args[0]) return message.channel.send(message.translate.error(this, "args", {
            prefix: "-"
        }))

        message.channel.send(message.translate.music.play.searching(args.join(' '))).then(async(msg) => {
            msg.delete({
                timeout: 10000
            })
        })


        const aTrackIsAlreadyPlaying = client.player.isPlaying(message.guild.id);

        //If there's already a track playing 
        if (aTrackIsAlreadyPlaying) {

            //Add the track to the queue
            const result = await client.player.addToQueue(message.guild.id, args.join(" "), message.author).catch(() => {});
            if (!result) {
                return message.channel.send(message.translate.error(null, "cannotPlayThisSong"))
            };

            if (result.type === 'playlist') {
                message.channel.send(message.translate.music.play.playlistAddQueue(result.tracks.length));
            } else {
                message.channel.send(message.translate.music.play.addToQueue(result.name));
            }

        } else {

            //Else, play the song
            const result = await client.player.play(message.member.voice.channel, args.join(" "), message.author).catch(() => {});
            if (!result) {
                return message.channel.send(message.translate.error(null, "cannotPlayThisSong"))
            };

            if (result.type === 'playlist') {
                message.channel.send(message.translate.music.play.playlistPlay(result.tracks.length, result.tracks[0].name));
            } else {
                message.channel.send(message.translate.music.play.play(result.name));
            }

            const queue = client.player.getQueue(message.guild.id)

                //Events
                .on('end', () => {
                    message.channel.send(message.translate.music.play.noMusic());
                })
                .on('trackChanged', (oldTrack, newTrack) => {
                    message.channel.send(message.translate.music.play.nowPlaying(newTrack));
                })
        }
    }
}
