const Discord = require('discord.js')

const client = new Discord.Client()
const chalk = require("chalk")
const SelfReloadJSON = require('self-reload-json');
const fs = require("fs")
const readdir = require("util").promisify(fs.readdir);
client.bots = new SelfReloadJSON(`${__dirname}/./bots.json`)
client.commands = new Discord.Collection();
client.musiccommands = new Discord.Collection();
client.events = new Discord.Collection();
client.config = new SelfReloadJSON(`${__dirname}/./config.json`);


let musicspawn = 0

client.login(client.config.token)

if (client.bots.radio.length == 0) {
    throw Error("[MultiRadio] No radio found !")
}



async function timeout() {
    setTimeout(async () => {
        try {
            client.emit("radioUpdate")
            if (musicspawn == client.bots.music.length) {
                client.emit("musicUpdate")
            }

        } catch (error) {
            return
        }
        timeout()
    }, 3500)
}

async function timeouts() {
    setTimeout(async () => {
        try {
            client.user.setActivity(`💎・DJ | ${client.config.prefix}help`);
        } catch (error) {
            return
        }
        timeouts()
    }, 60000)
}

timeouts()

//timeout()

client.makeJoin = async (id, cid) => {
    if (musicspawn !== client.bots.music.length) return
    client.emit("joinChannel", {
        channel: cid,
        botid: id
    })
}

client.initRadio = async () => {
    client.bots.radio.filter(x => x.enabled).forEach(async (r) => {
        const radio = new Discord.Client()
        radio.login(r.token)
        const broadcast = radio.voice.createBroadcast();
        let logs = require('discord-logs');
        logs(radio);

        const initr = async () => {
            let guild = radio.guilds.cache.get(client.config.guild)
            if (guild) {
                guild.channels.cache.get(r.channel).join()
                    .then(connection => {
                        broadcast.play(r.flux);
                        connection.play(broadcast);
                        console.log(`${radio.user.tag} is now playing`)
                    })
            } else {
                throw Error(`[MultiRadio] ${radio.user.tag} cannot find the guild ${client.config.guild}`)
            }

        }

        radio.on("voiceChannelSwitch", (member, oldChannel, newChannel) => {
            if (member.user.id == radio.user.id && r.locked) {
                let guild = radio.guilds.cache.get(client.config.guild)
                if (!guild) return
                require("system-sleep")(2000)
                guild.members.cache.get(radio.user.id).voice.setChannel(r.channel)
            }
        });


        //if (!radio.guilds.cache.get("709515577361825842")) throw Error(`[MultiRadio] Cannot find the guild ${client.config.guild}`)

        radio.on('ready', () => {
            console.log(`${radio.user.tag} is ready !`)
            r.type == radio.user.username
            let i = client.bots.radio.indexOf(r)
            client.bots.radio[i].id = radio.user.id
            client.bots.radio[i].ping = radio.ws.ping
            async function timeoutt() {
                setTimeout(async () => {
                    try {
                        client.bots.radio[i].ping = radio.ws.ping
                    } catch (error) {
                        return
                    }
                    timeoutt()
                }, 100)
            }
            timeoutt()
            client.bots.radio[i].startedAt = Date.now()
            client.bots.radio[i].type = radio.user.username
            radio.user.setActivity(`${r.type}`, {
                type: "LISTENING"
            })
            initr()
        });
        require("system-sleep")(1000)

    })
}

if (client.config.radio.autoconnect) {
    client.initRadio()
}

client.initMusic = async () => {
    client.bots.music.filter(x => x.enabled).forEach(async (m) => {
        const music = new Discord.Client()
        let i = client.bots.music.indexOf(m)
        music.login(m.token)
        music.commands = new Discord.Collection()
        const {
            Player
        } = require("discord-player")
        music.player = new Player(client)
        let logs = require('discord-logs');
        logs(music);

        const init = async () => {
            const files = await readdir("./botcommands/");
            files.filter(f => f.endsWith(".js")).forEach((f, i) => {
                try {
                    let props = require(`./botcommands/${f}`);
                    music.commands.set(props.name, props);
                    client.musiccommands.set(props.name, props);

                    console.log(chalk.yellow(`[${music.user.tag}] » ${chalk.underline("Command loaded !")} ${chalk.bold(f)}.`));
                } catch (error) {
                    console.log(error)
                }
            });
        }
        music.on('ready', async () => {
            musicspawn = musicspawn + 1
            client.bots.music[i].id = music.user.id
            let guild = music.guilds.cache.get(client.config.guild)
            async function timeoutt() {
                setTimeout(async () => {
                    try {
                        let song = {
                            name: "rien",
                        }
                        if (music.player.isPlaying(guild.id)) {
                            song = await music.player.nowPlaying(guild.id);
                        }
                        client.bots.music[i].playing = song.name
                        client.bots.music[i].ping = music.ws.ping
                    } catch (error) {
                        return
                    }
                    timeoutt()
                }, 100)
            }
            timeoutt()

            client.bots.music[i].used = false
            init()
        })
        music.on("voiceChannelLeave", (member, channel) => {
            if (member.user.id == music.user.id) return client.bots.music[i].used = false
        });
        client.on('joinChannel', async (d) => {
            if (d.botid !== music.user.id) return;

            client.bots.music[i].used = true

            let guild = music.guilds.cache.get(client.config.guild)
            guild.channels.cache.get(d.channel).join()


        })
        music.on('message', async (message) => {
            if (message.author.bot) return;
            if (message.channel.type.toLowerCase() !== "text") return;
            if (!message.guild.me.voice.channel) return;
            if (message.member.voice.channel.id == message.guild.me.voice.channel.id) {
                message.translate = require(`./language/${client.config.language}`)

                if (!message.content.startsWith("-")) return;

                let messageArray = message.content.split(" ");
                const args1 = message.content.slice("-".length).split(/ +/);
                const commandName = args1.shift().toLowerCase();
                let args = messageArray.slice(1);
                let cmd = music.commands.get(commandName) || music.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

                if (!cmd) return;

                cmd.execute(music, message, args);
            }
        })
    })
}

client.initMusic()















const init = async () => {

    const directories = await readdir("./commands/");
    directories.filter(d => !d.endsWith("disabled")).forEach(async (dir) => {
        const commands = await readdir("./commands/" + dir + "/");
        commands.filter(f => f.endsWith(".js")).forEach((f, i) => {
            try {
                let props = require(`./commands/${dir}/${f}`);
                props.class = dir;
                client.commands.set(props.name, props);
                console.log(chalk.yellow(`» ${chalk.underline("Command loaded !")} ${chalk.bold(f)} in the category ${chalk.bold(dir)}.`));
            } catch (error) {
                console.log(error)
            }
        });
    });

    fs.readdir("./events/", (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            const event = require(`./events/${file}`);
            let eventName = file.split(".")[0];
            console.log(`Loading event ${eventName}`);
            client.events.set(eventName, event)
            client.on(eventName, event.bind(null, client));
        });
    });
}

init();

module.exports = client
