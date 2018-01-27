const Discord = require("discord.js");
const fs = require('fs');
var colors = require('colors');

module.exports = message => {
    let client = message.client;
    let query = client.db;
    let xp = client.xp;
    let globalxp = client.globalxp;

    let now = new Date();

    if(!xp[message.guild.id]) xp[message.guild.id] = {};

    if(!xp[message.guild.id][message.author.id]) {
        xp[message.guild.id][message.author.id] = {cooldown: new Date()} 
        runXp(message);
        return;
    }

    if ((((new Date() - xp[message.guild.id][message.author.id].cooldown) / 1000 ) > 60)) {
        runXp(message);
        xp[message.guild.id][message.author.id] = {cooldown: new Date()} 
    } else {
    }
}

async function runXp(message) {
    let into = Math.floor(Math.random() * (30 - 10 + 1) + 10);
    let res = await message.client.db(`SELECT * FROM xp WHERE (user_id = '${message.author.id}' AND guild_id = '${message.guild.id}')`);
    if(res.length == 0) {
        w = `INSERT INTO xp(guild_id, user_id, xp) VALUES ('${message.guild.id}','${message.author.id}',${into})`;
    } else {
        xp = parseInt(res[0].xp);
        w = `UPDATE xp SET xp = ${xp + into} WHERE (guild_id = '${message.guild.id}' AND user_id = '${message.author.id}')`;
    }
        
    await message.client.db(w);
}