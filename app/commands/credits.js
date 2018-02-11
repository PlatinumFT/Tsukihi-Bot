const moment = require('moment');
const timediff = require('timediff');
const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
    let query = client.db;
    let cash;
    let time = "now";
    if(!args[0]) {
        let res = await query(`select * from currency where user_id = '${message.author.id}'`);
        if(!res[0]) {
            await query(`INSERT INTO currency (user_id, amount) VALUES ('${message.author.id}', 0)`);
            cash=0;
        } else {
            cash=res[0].amount;

            if(((new Date() - res[0].claimed) / 1000) < 86400000) {
                let r = moment(res[0].claimed);
                time = r.add(1, 'days').fromNow();
            }
        }

        await message.channel.send(await embed(message, `You currently have ${cash} cash. You can claim more ${time}.`));
    } else if(args[0] == "claim") {
        let res = await query(`select * from currency where user_id = '${message.author.id}'`);
        
        let date = new Date().toUTCString()
        if(!res[0]) {
            await query(`INSERT INTO currency (user_id, amount, claimed) VALUES ('${message.author.id}', 200, '${date}')`);
        } else {
            if(((new Date() - res[0].claimed) / 1000) < 86400000) {
                let r = moment(res[0].claimed);
                return await message.channel.send(await embed(message, `You've already claimed your cash. You can claim again ${r.add(1, 'days').fromNow()}.`));
            }
            await query(`update currency SET amount = ${200+parseInt(res[0].amount)}, claimed = '${date}' where user_id='${message.author.id}'`);
        }

        await message.channel.send(await embed(message,`You've claimed your daily cash!`));
    }
}

module.exports.help = {
    name: "cash",
    description: "Checks your current money.",
    usage: "cash",
    type: "currency"
}

exports.conf = {
    aliases: [ '$' ]
}

async function embed(message, str) {
    let embed = new Discord.RichEmbed()
            .setDescription(str)
            .setColor(await message.guild.members.get(message.client.user.id).displayColor);
    return embed;
}