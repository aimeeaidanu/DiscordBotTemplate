const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'work',
    cooldown: 1000 * 60 * 60 * 2,
    run: async(client, message, args) => {
        const jobs = ['programmer', 'Builder', 'Waiter', 'Bus Driver', 'Chef', 'Mechanic', 'Doctor'];
        const jobIndex = Math.floor(Math.random() * jobs.length);
        const coins = Math.floor(Math.random() * 200) + 1;

        message.channel.send(`You worked as ${jobs[jobIndex]} and earned ** ${coins}** coins!`)
        client.add(message.author.id, coins);
    }
}