const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'delete',
    description: 'deletes a channel. Do -delete [channel name]',
    run: async(client, message, args) => {
        if(!message.member.permissions.has('MANAGE_CHANNELS')) 
            return message.reply('You do not have permission');
        
        const channelTarget = message.mentions.channels.first() || message.channel;

        channelTarget.delete().then((ch) => {
            message.author.send(`Channel has been deleted!`)
        });
    },
};