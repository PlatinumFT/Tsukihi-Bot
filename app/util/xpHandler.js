const Discord = require("discord.js");
const fs = require('fs');
var colors = require('colors');

module.exports = message => {
    let client = message.client;
    let xp = client.xp;
    let globalxp = client.globalxp;

    let now = new Date();

    if(!xp[message.guild.id]) xp[message.guild.id] = {};

    if(!xp[message.guild.id][message.author.id]) 
        return xp[message.guild.id][message.author.id] = {cooldown: new Date().getTime()} 
    

}