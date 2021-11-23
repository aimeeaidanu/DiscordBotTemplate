const { Client, Message, MessageEmbed } = require('discord.js');
const inventory = require('../../models/inventory');
const items = require('../../shopItems');
module.exports = {
    name:'buy',
    run: async(client, message, args) => {
        if(!args[0]) return message.channel.send('Please specify an item to buy!');
        const itemToBuy = args[0].toLowerCase();
        const validItem = !!items.find((val) => val.item === itemToBuy);
        if(!validItem) return message.reply('The item that you wanted to buy is not valid!');
        const itemPrice = items.find((val) => (val.item.toLowerCase()) === itemToBuy).price;
        const userBalance = await client.bal(message.author.id);
        if(userBalance < itemPrice) return message.reply(`You only have ${userBalance} coins, but the item costs ${itemPrice} coins!`)
        const params = {
            Guild: message.guild.id,
            User: message.author.id
        }
        inventory.findOne(params, async(err, data) => {
            if(data) {
                const hasItem = Object.keys(data.Inventory).includes(itemToBuy);
                if(!hasItem) {
                    data.Inventory[itemToBuy] = 1;
                } else {
                    data.Inventory[itemToBuy]++
                }
                console.log(data);
                await inventory.findOneAndUpdate(params, data);
            } else {
                new inventory({
                    Guild: message.guild.id,
                    User: message.author.id,
                    Inventory: {
                        [itemToBuy]: 1
                    },
                }).save();
            }
            message.reply(`You have bought ${itemToBuy}`);
            client.remove(message.author.id, itemPrice);
        });
    },
};