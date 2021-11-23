const { Client, Message, MessageEmbed } = require('discord.js');
const inventory = require('../../models/inventory');
const items = require('../../shopItems');
module.exports = {
    name:'sell',
    run: async(client, message, args) => {
        if(!args[0]) return message.channel.send('Please specify an item to sell!');
        const itemToBuy = args[0].toLowerCase();
        const validItem = !!items.find((val) => val.item === itemToBuy);
        if(!validItem) return message.reply('The item that you wanted to sell is not valid!');
        const itemPrice = items.find((val) => (val.item.toLowerCase()) === itemToBuy).price;
        const userBalance = await client.bal(message.author.id);
        const params = {
            Guild: message.guild.id,
            User: message.author.id
        }
        inventory.findOne(params, async(err, data) => {
            if(data) {
                const hasItem = Object.keys(data.Inventory).includes(itemToBuy);
                if(!hasItem) {
                    return message.reply('You do not have that item!');
                } else {
                    data.Inventory[itemToBuy]--
                }
                console.log(data);
                await inventory.findOneAndUpdate(params, data);
            } else {
                new inventory({
                    Guild: message.guild.id,
                    User: message.author.id,
                    Inventory: {
                        [itemToBuy]: 0
                    },
                }).save();
            }
            message.reply(`You have sold ${itemToBuy}`);
            client.add(message.author.id, itemPrice);
        });
    },
};