const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'add',
    run: async(client, message, args) => {
        if(message.author.id !== '669400902028754965') return message.reply('No Permission :(.');
        const member = message.mentions.members.first() || message.member;
        client.add(member.id, parseInt(args[0]));
        message.channel.send('Added balance')
    }
}