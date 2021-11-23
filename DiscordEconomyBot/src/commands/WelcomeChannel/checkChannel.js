const Schema = require('../../models/welcomeChannel');
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'check-channel',
    run: async(client, message, args) => {
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply('you do not have permission');

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(!data) return message.reply('this guild has no data stored');

            const channel = client.channels.cache.get(data.Channel);

            message.reply(`Welcome channel => ${channel}`);
        });
    },
};