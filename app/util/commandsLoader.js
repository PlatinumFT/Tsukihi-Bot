const Discord = require("discord.js");
const fs = require('fs');
var colors = require('colors');

module.exports = client => {
    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();
    fs.readdir("./app/commands", (err, files) => {
        if(err) console.error(err);
        files.forEach((f, i) => {
            let folder = f.split('.');
            if(folder[1]) return;
            fs.readdir(`./app/commands/${f}/`, (err, jsf) => {
                let jsfiles = jsf.filter(f => f.split(".").pop() === "js");
                if(jsfiles.length <= 0 ) {
                    console.log(`No commands found in ${f}`.red);
                    return;
                }
    
                console.log(`Loading ${jsfiles.length} commands in ${f}!`.bold.yellow)
    
                jsfiles.forEach((j, k) => {
                    let props = require(`../commands/${f}/${j}`);
                    props.help.type = f;
                    client.commands.set(props.help.name, props);
                    if(!props.conf || !props.conf.aliases || props.conf.aliases[0] == '') return;
                    props.conf.aliases.forEach(alias => {
                        client.aliases.set(alias, props.help.name);
                })
            });
            })
        })
    });
}
