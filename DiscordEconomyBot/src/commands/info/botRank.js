const { MessageEmbed } = require('discord.js')
module.exports = {
    name : 'botrank',
    category : 'info',
    description : 'Badmin',

    run : async(client, message, args) => {
        if(message.author.id === '717878239242223688') {
        const embed = new MessageEmbed()
            .setTitle('Rank!')
            .setDescription(`Your Rank: BADMIN`)
            await message.channel.send(embed)
        } else {
            return message.reply('Your Rank: NORMAL');
        }
        if(message.author.id === '669400902028754965') {
            const embe = new MessageEmbed()
                .setTitle('Rank!')
                .setDescription(`Your Rank: OWNER`)
            await message.channel.send(embe)
        } else {
            return
        }

    }
}