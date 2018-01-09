var colors = require('colors');
var os = require('os');
module.exports = client => {
    console.log(`${client.user.username} has started`.bold.magenta)
    console.log(`|----------------------|`);
    console.log(` Users: `.bold.red + `${client.users.size}`)
    console.log(` Channels: `.bold.red + `${client.channels.size}`)
    console.log(` Guilds: `.bold.red + `${client.guilds.size}`)
    console.log(`|----------------------|`);

    require('../util/commandsLoader.js')(client);    
}