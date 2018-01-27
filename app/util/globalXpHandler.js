const Discord = require("discord.js");
const fs = require('fs');
var colors = require('colors');

module.exports = message => {
    let client = message.client;
    let query = client.db;
    let xp = client.globalxp;
    let globalxp = client.globalxp;

    let now = new Date();


    if(!xp[message.author.id]) {
        xp[message.author.id] = {cooldown: new Date()} 
        runXp(message);
        return;
    }

    if ((((new Date() - xp[message.author.id].cooldown) / 1000 ) > 60)) {
        runXp(message);
        xp[message.author.id] = {cooldown: new Date()} 
    } else {
    }
}

async function runXp(message) {
    let into = Math.floor(Math.random() * (30 - 10 + 1) + 10);
    let res = await message.client.db(`SELECT * FROM globalxp WHERE (user_id = '${message.author.id}')`);
    if(res.length == 0) {
        w = `INSERT INTO globalxp(user_id, xp) VALUES ('${message.author.id}',${into})`;
    } else {
        xp = parseInt(res[0].xp);
        w = `UPDATE globalxp SET xp = ${xp + into} WHERE (user_id = '${message.author.id}')`;
    }
        
    await message.client.db(w);
}