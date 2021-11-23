const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'donate',
    run: async(client, message, args) => {
        const user = message.mentions.users.first();
        if(!user) return message.reply('You need to mention a user!');

        const coinsToDonate = args[1];
        if(!coinsToDonate)
            return message.reply(
                'Please specify an amount of coins to donate!'
            );
        if(isNaN(coinsToDonate)) 
            return message.reply('Coins must be a number!');

        const convertedDonation = parseInt(coinsToDonate);
        if(await client.bal(message.author.id) < convertedDonation) 
            return message.reply('Insufficient Funds!');

        await client.remove(message.author.id, convertedDonation);
        await client.add(user.id, convertedDonation);

        message.channel.send(`${message.author} has donated ${convertedDonation} coins to ${user}`)
    },
};