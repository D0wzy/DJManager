module.exports = async (client) => {
    console.log("------------------------")
    //If the bot is ready it sends a message in the console
    console.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);
    client.spawned = true
}