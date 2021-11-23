const { message } = require('discord.js')

module.exports = {
    name: 'removerole',
    description: '-removerole [role] [user]',
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('You do not have permission.')
        const target = message.mentions.members.first()
        if(!target) return message.channel.send('No Specified Member')
        const role = message.mentions.roles.first()
        if(!role) return message.channel.send('No Specified Role')
        await target.roles.remove(role)
        message.channel.send(`${target.user.username} has lost a role`)
    }
}