const client = require('../index')

function duration(ms) {
    const sec = Math.floor((ms / 1000) % 60).toString()
    const min = Math.floor((ms / (1000 * 60)) % 60).toString()
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
    return `${hrs.padStart(2, '') == "0" ? "" : `**${hrs.padStart(2, '')}** heures, `}${min.padStart(2, '') == "0" ? "" : `**${min.padStart(2, '')}** minutes et `}**${sec.padStart(2, '')}** secondes.`
}

module.exports = {
    local: "fr_FR",

    error: (cmd, error, options) => {
        if (error == "args") {
            return `:x: | Usage incorrect !\nExemple: \`${options ? options.prefix : client.config.prefix}${cmd.name} ${cmd.usage}\``
        }
        if (error == "userPermissions") {
            return `:x: | Vous n'avez pas les permissions suffisantes pour faire cette commande. (${options.permissions.map(p => `\`${p}\``).join("")})`
        }
        if (error == "botPermissions") {
            return `:x: | Je n'ai pas les permissions suffisantes pour faire cette commande. (${options.permissions.map(p => `\`${p}\``).join("")})`
        }
        if (error == "ownerOnly") {
            return `:x: | Seulement ${options.owners.map(o => client.users.cache.get(o).tag).slice(0, -1).join(', ') + ' et ' + options.owners.map(o => client.users.cache.get(o).tag).slice(-1)} peuvent faire cette commande !`
        }
        if (error == "notInVoiceChannel") {
            if (options && options.mentionUser) return `${options.user}, vous n'êtes pas dans un salon vocal.`
            return `:x: | Vous n'êtes pas dans un salon vocal.`
        }
        if (error == "noAvaibleBot") {
            if (options && options.mentionUser) return `${options.user}, il n'y a aucun bot de disponible, réessaye plus tard.`
            return `:x: | Il n'y a aucun bot de disponible, réessaye plus tard.`
        }
        if (error == "notPlaying") {
            return `:x: | Aucune musique n'est en lecture.`
        }
        if (error == "playingInAnotherChannel") {
            return `:x: | Je suis déjà dans un autre salon.`
        }
        if (error == "cannotPlayThisSong") {
            return `:x: | Malheureusement, je ne peux pas jouer ce son :/`
        }
    },
    utils: (type, options) => {
        if (type == "tag") {
            return `Hey ${options.user}, besoin d'aide ? Mon préfix est \`${client.config.prefix}\``
        }
    },
    radio: {
        status: {
            title: `**__» Statut des radios__**`,
            field: (r) => `${client.guilds.cache.get(client.config.guild).members.cache.get(r.id).voice.channel ? `Channel: [${client.guilds.cache.get(client.config.guild).members.cache.get(r.id).voice.channel.name}](https://discord.com/channels/${client.guilds.cache.get(client.config.guild).id}/${client.guilds.cache.get(client.config.guild).members.cache.get(r.id).voice.channel.id} "Rejoindre le salon.")\nAuditeur${client.guilds.cache.get(client.config.guild).members.cache.get(r.id).voice.channel.members.filter(x => !x.user.bot).size > 1 ? "s" : ""}: **${client.guilds.cache.get(client.config.guild).members.cache.get(r.id).voice.channel.members.filter(x => !x.user.bot).size}**\nVérouillé: ${r.locked ? ":white_check_mark:" : ":x:"}\nJoue depuis ${duration(Date.now() - r.startedAt)}\nPing: **${r.ping}ms**` : `:x:`}`
        },
    },

    musicstatus: {
        status: {
            description: `Cliquez sur la réaction <a:valide:756969815071129791> pour avoir un bot\nNotes: Le préfix des bots musiques est \`-\`, vous ne pouvez pas utiliser les commandes d'un bot musique sans l'avoir ramener dans votre salon vocal en cliquant sur la réaction. \nCommandes des bots musiques: \`play\`, \`pause\`, \`nowplaying\`, \`queue\`, \`loop\`, \`shuffle\`, \`skip\`, \`resume\`, \`volume\`, \`clear-queue\``,
            title: `**__» Statut des bots musiques__**`,
            field: (r) => `${client.guilds.cache.get(client.config.guild).members.cache.get(r.id).voice.channel ? `Channel: [${client.guilds.cache.get(client.config.guild).members.cache.get(r.id).voice.channel.name}](https://discord.com/channels/${client.guilds.cache.get(client.config.guild).id}/${client.guilds.cache.get(client.config.guild).members.cache.get(r.id).voice.channel.id} "Rejoindre le salon.")\nAuditeur${client.guilds.cache.get(client.config.guild).members.cache.get(r.id).voice.channel.members.filter(x => !x.user.bot).size > 1 ? "s" : ""}: **${client.guilds.cache.get(client.config.guild).members.cache.get(r.id).voice.channel.members.filter(x => !x.user.bot).size}**\nJoue \`${r.playing}\`\nPing: **${r.ping}ms**` : `:x:`}`
        },
    },

    admin: {
        setprefix: {
            success: (prefix) => `:white_check_mark: | Nouveau préfix: \`${prefix}\``
        },
        setlanguage: {
            success: (language) => `:white_check_mark: | Nouvelle langue: \`${language}\``
        },
        setfooter: {
            success: (footer) => `:white_check_mark: | Nouveau footer: \`${footer}\``
        },
        setcolor: {
            success: (color) => `:white_check_mark: | Nouvelle couleur: \`${color}\``
        },
        restart: {
            success: () => `:white_check_mark: | Toutes les radios ont été redémarrées ! (${client.bots.radio.map(r => `${r.type}`).join(', ')})`
        },
        lock: {
            success: (radio) => `:white_check_mark: | La radio \`${radio}\` est maintenant vérouillée. (Il est impossible de la déplacer dans un autre salon.)`
        },
        unlock: {
            success: (radio) => `:white_check_mark: | La radio \`${radio}\` est maintenant dévérouilée. (Vous pouvez maintenant la déplacer dans un autre salon)`
        }
    },
    general: {
        help: {
            title: `**__» Page d'aide__**`,
            categories: {
                'admin': `:desktop_computer:・Administration`,
                'general': ':pushpin:・Général',
                'owner': '👑・Créateur'
            },
            description: () => `Préfix du bot: \`${client.config.prefix}\`\nNombre de commande: **${client.commands.size}**\nNombre d'événement: **${client.events.size}**\nNombre de radio: **${client.bots.radio.length}**`
        },
        radio: {
            title: `**__» Liste des radios (${client.bots.radio.length})__**`,
            field: (r) => `${client.guilds.cache.get(client.config.guild).members.cache.get(r.id).voice.channel ? `Channel: [${client.guilds.cache.get(client.config.guild).members.cache.get(r.id).voice.channel.name}](https://discord.com/channels/${client.guilds.cache.get(client.config.guild).id}/${client.guilds.cache.get(client.config.guild).members.cache.get(r.id).voice.channel.id} "Rejoindre le salon.")\nAuditeur${client.guilds.cache.get(client.config.guild).members.cache.get(r.id).voice.channel.members.filter(x => !x.user.bot).size > 1 ? "s" : ""}: **${client.guilds.cache.get(client.config.guild).members.cache.get(r.id).voice.channel.members.filter(x => !x.user.bot).size}**\nVérouillé: ${r.locked ? ":white_check_mark:" : ":x:"}\nJoue depuis ${duration(Date.now() - r.startedAt)}\nPing: **${r.ping}ms**` : `:x:`}`
        }
    },
    owner: {
        reload: {
            success: (cmd) => `:white_check_mark: | La commande \`${cmd}\` a été reload !`,
            cantFind: (cmd) => `:x: | Je ne trouve aucune commande nommée \`${cmd}\``
        }
    },
    music: {
        'clear-queue': {
            success: (i) => `:white_check_mark: | J'ai retiré ${i} son${i > 1 ? 's' : ''} de la queue !`
        },
        filter: {
            disabling: (f) => `:white_check_mark: | Je désactive le filtre ${f}, merci de patienter...`,
            enabling: (f) => `:white_check_mark: | J'active le filtre ${f}, merci de patienter...`
        },
        play: {
            searching: (n) => `Recherche de résultats pour \`${n}\` en cours...`,
            playlistAddQueue: (s) => `:white_check_mark: | J'ajoute ${s} musique à la queue`,
            addToQueue: (s) => `:white_check_mark: | J'ajoute \`${s}\` à la queue.`,
            playlistPlay: (i, n) => `:white_check_mark: | J'ajoute ${i} musique à la queue.\nJe joue maintenant \`${n}\``,
            play: (n) => `:white_check_mark: | Je joue maintenant \`${n}\` !`,
            noMusic: () => `Il n'y a plus aucune musique dans la queue. Je quitte le salon.`,
            nowPlaying: (t) => `Je joue maintenant \`${t.name}\`.\nDemandée par ${t.requestedBy.tag}`,
        },
        queue: {
            noMusic: () => `Il n'y a aucune musique dans la queue.`,
            queue: (queue) => {
                return `\`\`\`En cours - ${queue.playing.name} | ${queue.playing.author} | Demandée par ${queue.playing.requestedBy.tag} (${queue.playing.duration})\n` +
                queue.tracks.map((track, i) => {
                    return `#${i+1} - ${track.name} | ${track.author} | Demandée par ${track.requestedBy.tag} (${track.duration})`
                }).join('\n\n')+`\`\`\``
            }
        },
        nowplaying: {
            nowPlaying: (song, message, m) => `Je joue actuellement \`${song.name}\` - ${song.duration} (Demandée par ${song.requestedBy.tag})\nBarre de progression: \`[${m.player.createProgressBar(message.guild.id)}]\``
        },
        stop: {
            stop: (t) => `:white_check_mark: | Je stoppe la lecture de \`${t.name}\``
        },
        skip: {
            skip: (t) => `:white_check_mark: | Je saute la lecture de \`${t.name}\``
        },
        resume: {
            resume:(t) => `:white_check_mark: | Je reprends la lecture de \`${t.name}\``
        },
        pause: {
            pause: (t) => `:white_check_mark: | Je mets la lecture de \`${t.name}\` en pause.`
        },
        shuffle: {
            shuffle: `:white_check_mark: | Je mélange la queue.`
        },
        loop: {
            enable: `:white_check_mark: | Je répèterai ce son lorsqu'il sera finit.`,
            disable: `:white_check_mark: | Je ne répèterai pas ce son lorsqu'il sera finit.`
        },
        volume: {
            success: (v) => `:white_check_mark: | Je définis le volume de la lecture à \`${v}\`.${v >= 100 ? "\n⚠️ | À pleine puissance, l'écoute prolongée du baladeur peut endommager l'audition de l'utilisateur !" : "" }`
        }
    }
}
