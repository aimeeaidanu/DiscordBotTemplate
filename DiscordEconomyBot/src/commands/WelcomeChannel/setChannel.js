const Schema = require('../../models/welcomeChannel');
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'set-channel',
    run: async(client, message, args) => {
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply('you do not have permission');

        const channel = message.mentions.channels.first();
        if(!channel) return message.reply('Please Mention a Channel!');

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) {
                data.Channel = channel.id;
                data.save();
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Channel: channel.id,
                }).save();
            }
            message.reply(`${channel} has been set as the welcome channel`)
        });
    },
};
