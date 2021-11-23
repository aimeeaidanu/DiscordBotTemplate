const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'doubleOrNothing',
    aliases: ['gamble-double'],
    run: async(client, message, args) => {
        if(!args[0]) return message.reply('Please specify an amount to bet!');
        if(isNaN(args[0])) return message.reply('Argument must be a number');
        const amountToBet = parseInt(args[0]);
        if(await client.bal(message.author.id) < amountToBet) return message.reply('You have insufficient balance to make this bet! ');
        function random() {
            const num = Math.floor(Math.random() * 2);
            return num === 1;
        };
        if(random() === true ) {
            const winAmount = amountToBet * 2;
            message.channel.send(`Congrats you have won ${winAmount} coins!`);
            client.add(message.author.id, winAmount)
        } else {
            message.channel.send(`Awww you lost ${amountToBet} coins. Better luck next time!`);
            client.remove(message.author.id, amountToBet)
        }
    }
}