const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'create',
    description: 'creates a channel. Do -create [channel name]',
    run: async(client, message, args) => {
        if(!message.member.permissions.has('MANAGE_CHANNELS')) return message.reply('You do not have permission');

        const channelNameQuery = args.join(" ");
        if(!channelNameQuery) return message.reply('Please specify a channel name!');

        message.guild.channels.create(channelNameQuery).then((ch) => {
            message.channel.send(`Click ${ch} to access the newly created channel!`);
        });
    },
};