const Discord = require("discord.js");

const client = new Discord.Client({disableEveryone: true});
      client.db = require('./pgsql.js');
module.exports = {
    run: async function() {
        let query = client.db;

        let res = await query(`SELECT * FROM SETTINGS`);
        client.settings = res[0];
        require('./util/eventLoader')(client);
        await client.login(res[0].token);
    },

    migration: async function() {
        let query = client.db;

        await query(`CREATE TABLE IF NOT EXISTS guilds(guild_id varchar(30), prefix varchar(10))`);
        await query(`CREATE TABLE IF NOT EXISTS settings(token varchar, prefix varchar(10))`);
    }
}