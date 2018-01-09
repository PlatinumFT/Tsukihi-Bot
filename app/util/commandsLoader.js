const Discord = require("discord.js");
const fs = require('fs');
var colors = require('colors');

module.exports = client => {
    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();
    fs.readdir("./app/commands/", (err, files) => {
        if(err) console.error(err);
        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if(jsfiles.length <= 0 ) {
            console.log("No commands to load!".red);
            return;
        }

        console.log(`Loading ${jsfiles.length} commands!`.bold.magenta);
            
        jsfiles.forEach((f, i) => {
            let props = require(`../commands/${f}`);
            client.commands.set(props.help.name, props);
            if(!props.conf || !props.conf.aliases) return;
            props.conf.aliases.forEach(alias => {
                client.aliases.set(alias, props.help.name);
            })
        });
    });
}