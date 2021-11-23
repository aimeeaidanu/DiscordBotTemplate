const { Collection, Client, Discord } = require('discord.js');
const client = new Client({
    disableMention: 'everyone'
});
const schema = require('./schema');
const mongoose = require('mongoose');
mongoose.connect('', {
    UseUnifiedTopology: true,
    useNewUrlParser: true
})
const db = require('quick.db')  
const path = require('path')
const fs = require('fs')
const config = require('./config.json');
module.exports = client;
client.commands = new Collection();
client.prefix = config.PREFIX;
client.aliases = new Collection();
client.categories = fs.readdirSync(path.resolve('src/commands'));
["command"].forEach(handler => {
    require(path.resolve(`src/handlers/${handler}`))(client);
}); 

//CLIENT EVENTS
  
  client.on("warn", info => console.log(info));
  
  client.on("error", console.error)

//functions
client.bal = (id) => new Promise(async ful => {
    const data = await schema.findOne({ id });
    if(!data) return ful(0);
    ful(data.coins);
})
client.add = (id, coins) => {
    schema.findOne({ id }, async(err, data) => {
        if(err) throw err;
        if(data) {
            data.coins += coins;
        } else {
            data = new schema({ id, coins })
        }
        data.save();
    })
}
client.remove = (id, coins) => {
    schema.findOne({ id }, async(err, data) => {
        if(err) throw err;
        if(data) {
            data.coins -= coins;
        } else {
            data = new schema({ id, coins: -coins })
        }
        data.save();
    })
}

client.on("ready", () => {
    const Guilds = client.guilds.cache.map(guild => guild.name);
    console.log(Guilds);
});

const Schema = require('./models/welcomeChannel');
const { MessageAttachment, MessageEmbed } = require('discord.js');

client.on('guildMemberAdd', async (member) => {
    Schema.findOne({ Guild: member.guild.id }, async (e, data) => {
        if(!data) return;
        const user = member.user;
        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('New Member')
        .setDescription(`**${member.displayName}** welcome to ${member.guild.name}, we now have ${member.guild.memberCount} members!`)
        const channel = member.guild.channels.cache.get(data.Channel);
        channel.send(embed)
    })
})
client.on('guildMemberRemove', async (member) => {
    Schema.findOne({ Guild: member.guild.id }, async (e, data) => {
        if(!data) return;
        const user = member.user;
        const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle('New Member')
        .setDescription(`**${member.displayName}** left ${member.guild.name}, we now have ${member.guild.memberCount} members!`)
        const channel = member.guild.channels.cache.get(data.Channel);
        channel.send(embed)
    })
})

client.login(config.TOKEN);