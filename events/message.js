const Discord = require("discord.js")

module.exports = (client, message) => {

    if (message.author.bot) return;
    if (message.channel.type.toLowerCase() !== "text") return;

    message.translate = require(`../language/${client.config.language}`)

    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
        return message.channel.send(message.translate.utils("tag", {
            user: message.author
        }))
    }
    if (!message.content.startsWith(client.config.prefix)) return;

    let messageArray = message.content.split(" ");
    const args1 = message.content.slice(client.config.prefix.length).split(/ +/);
    const commandName = args1.shift().toLowerCase();
    let args = messageArray.slice(1);
    let cmd = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!cmd) return;

    if (cmd.ownerOnly && !client.config.owners.includes(message.author.id)) {
        return message.channel.send(message.translate.error(null, "ownerOnly", {
            owners: client.config.owners
        }))
    }

    if (cmd.userPermissions) {
        if (!message.member.hasPermission(cmd.userPermissions)) return message.channel.send(message.translate.error(null, "userPermissions", {
            permissions: cmd.userPermissions
        }));
    }
    if (cmd.botPermissions) {
        if (!message.guild.me.hasPermission(cmd.botPermissions)) return message.channel.send(message.translate.error(null, "botPermissions", {
            permissions: cmd.botPermissions
        }));
    }

    cmd.execute(client, message, args);
}