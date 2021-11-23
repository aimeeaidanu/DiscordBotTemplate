const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'daily',
    cooldown: 1000 * 60 * 60 * 24,
    run: async(client, message, args) => {
        const coins = Math.floor(Math.random() * 2000) + 1;

        message.channel.send(`You received **${coins}** coins today! Make sure to claim it again tomorrow!`)
        client.add(message.author.id, coins);
    }
}