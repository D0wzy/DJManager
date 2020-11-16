const Discord = require ("discord.js")

module.exports = {
    name : "help",
    aliases : ["h"],
    usage: "<command>",
    ownerOnly: false,
    userPermissions: [],
    botPermissions: [],
    async execute(client, message, args) {
        if(args[0]) {
            return
        }
        
        let embed = new Discord.MessageEmbed()

        embed.setTitle(message.translate.general.help.title)
        embed.setDescription(message.translate.general.help.description())
        embed.setFooter(client.config.footer)
        embed.setTimestamp()
        embed.setColor(client.config.color)
        
        const categories = []
        client.commands.array().forEach(async(command, i) => {
            if(!categories.includes(command.class)){
				categories.push(command.class);
			}
        })

        categories.sort().forEach((cat) => {
			const tCommands = client.commands.filter((cmd) => cmd.class === cat);
			embed.addField(`${message.translate.general.help.categories[cat.toLowerCase()]} (${tCommands.size})`, tCommands.map((cmd) => "`"+cmd.name+"`").join(", "));
        });
        
        message.channel.send(embed)
    }
}
