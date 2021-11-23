const { Client, Message, MessagEmbed, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'apply',
    description: 'apply for job by typing -apply. The bot will then dm you instructions, and your application will be posted in the #applications channel.',
    run: async(client, message, args) => {
        const questions = [
            "How old are you",
            "Where are you from",
            "Why are you worthy",
            "What is your gender",
        ];

        let collectCounter = 0;
        let endCounter = 0;

        const filter = (m) => m.author.id === message.author.id;
        const appStart = await message.author.send(questions[collectCounter++]);
        const channel = appStart.channel;
        const collector = channel.createMessageCollector(filter);
        collector.on('collect', () => {
            if(collectCounter < questions.length) {
                channel.send(questions[collectCounter++]);
            } else {
                collector.stop('fulfilled');
            }
        });
        const appChannel = client.channels.cache.get('896869929477877791');
        collector.on('end', (collected, reason) => {
            if(reason === 'fulfilled') {
                let index = 1;
                const mappedResponses = collected.map((msg) => {
                    return `${index++}) ${questions[endCounter++]}\n-> ${msg.content}`
                }).join('\n\n');
            }
            appChannel.send()
                new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setTitle('Application')
                    .setDescription(mappedResponses)
                    .setColor('RANDOM')
                    .setTimestamp()
        })
    },
};