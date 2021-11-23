const { Client, Message, MessageEmbed } = require('discord.js')
const fetch = require('node-fetch') // npm i node-fetch

module.exports = {
    name : 'meme',
    description: 'Get a meme! To begin, do -meme',
    run : async(client, message, args) => {

        const meme = await fetch('https://meme-api.herokuapp.com/gimme').then((res) => res.json()) // From Where BOT Will Get Memes

        const embed = new MessageEmbed()
        .setTitle(meme.title)
        .setURL(meme.postLink)
        .addField('Author:-', meme.author, true) // <true> So It Will Come In On Line
        .addField('UpVote', meme.ups, true) // <true> So It Will Come In On Line
        .addField('SubReddit', meme.subreddit, true) // <true> So It Will Come In On Line
        .setImage(meme.url)
        .setColor('RANDOM')
        .setFooter(`Requested By ${message.author.username}`)
        .setTimestamp()
        message.channel.send(embed)
    }
}