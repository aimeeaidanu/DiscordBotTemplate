module.exports = {
    name: 'ban',
    description: '-ban [user]',
    run : async(client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You do not have permission.')
        if(!message.guild.me.hasPermission('ADMINISTRATOR')) return message.channel.send('I do not have Permissions.');
        const Member = message.mentions.members.first()
        if(!Member) return message.channel.send('Please specify member to ban')
        await Member.ban({ reason: args.slice(1).join("")})
        message.channel.send(`${Member.user.tag} was banned from the server.`)
    }
}