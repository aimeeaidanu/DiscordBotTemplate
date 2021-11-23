const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'fetch-bans',
    description: 'fetches banned users by doing -fetch-bans',
    run: async(client, message, args) => {
        if(!message.member.permissions.has("BAN_MEMBERS")) return;

        const fetchBans = message.guild.fetchBans();
        const bannedMembers = (await fetchBans)
            .map((member) => `\`${member.user.tag}\``)
            .join("\n");

        message.channel.send(bannedMembers)
    }
};