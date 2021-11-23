const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'dm',
    description: 'DM user by doing -dm [user] [message]. For anonymous DMs, do -dm [user] [message] -a',
    run: async (client, message, args) => {
        if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply('You do not have permission');
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])?.user;

        const str = args.slice(1).join(" ");
        if(message.content.includes("-a")) {
            await user.send(str.replace("-a", ""));
        } else{
            await user.send(`${message.author.tag}: ${str}`);
        }
    },
};