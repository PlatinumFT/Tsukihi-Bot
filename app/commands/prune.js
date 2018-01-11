exports.run = async (client, message, args) => {
    if (args[0]) {
        if(!parseInt(args[0])) return message.channel.send(`Please use a valid number!`);

        const fetched = await message.channel.fetchMessages({limit: args[0]});
        message.channel.bulkDelete(fetched)
            .catch(error => message.channel.send(`Error: ${error}`));
    } else {
        const fetched = await message.channel.fetchMessages({limit: 100});
        let botMessages = {};
        fetched.forEach(e => {
            if (e.author.id == client.user.id) botMessages.push(e);
            else return;
        })
        message.channel.bulkDelete(botMessages)
            .catch(error => message.channel.send(`Error: ${error}`));
    }
}

exports.help = {
    name: "prune",
    description: "Prunes messages. No message will by default prune the bot.",
    usage: "prune",
    type: "moderation"    
}