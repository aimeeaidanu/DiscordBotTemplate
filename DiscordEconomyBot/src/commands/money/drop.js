const { Client, Message, MessageEmbed } = require('discord.js');
const { prefix } = require('../../config.json');
module.exports = {
    name: 'drop',
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return;
        const channel = message.mentions.channels.first();
        if(!channel) return message.reply('Please mention a channel!');
        const coinsAmount = args[1];
        if(!coinsAmount) return message.reply('Please specify an amount of coins!');
            const filter = (msg) => msg.guild.id === message.guild.id && msg.content === `${prefix}claim`;
            message.channel.send('The drop has started in ' + channel.toString());
            channel.send(`Here comes a random drop! Use ${prefix}claim to claim this amount of coins!`)
        channel.awaitMessages(filter, {max: 1, time: 60000 })
            .then(async(msg) => {
                const id = msg.first().author.id;
                const coinsToClaim = parseInt(coinsAmount);

                client.add(id, coinsToClaim);
                msg.first().reply('Congrats! You have claimed ' + coinsToClaim + " coins!")
            })
    }
}