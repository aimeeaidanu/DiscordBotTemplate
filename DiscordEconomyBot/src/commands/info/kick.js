module.exports = {
    name: 'kick',
    description: '-kick [user]',
    run : async(client, message, args) => {
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('You do not have permission.')
        if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('I do not have Permissions.');
        const Member = message.mentions.members.first()
        if(!Member) return message.channel.send('Please specify member to kick')
        await Member.kick({ reason: args.slice(1).join("")})
        message.channel.send(`${Member.user.tag} was kicked from the server.`)
    }
}