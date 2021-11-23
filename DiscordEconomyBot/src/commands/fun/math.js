const { Client, Message, MessageEmbed } = require('discord.js');
const math = require('math.js');

module.exports = {
    name: 'math',
    description: 'does math',
    run: async( client, message, args) => {
        try{
            message.channel.send(
                new MessageEmbed()
                    .addField('Question', args.join(" "))
                    .addfield('Solution', math.evaluate(args.join(" ")))   
            );
        } catch (err) {
            message.channel.send('ERROR! Could not fetch parsed json data!');
        }
    },
};