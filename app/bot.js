const Discord = require("discord.js");

const client = new Discord.Client({disableEveryone: true});
      client.db = require('./pgsql.js');
      client.xp = {};
      client.globalxp = {};
module.exports = {
    run: async function() {
        let query = client.db;

        let res = await query(`SELECT * FROM SETTINGS`);
        client.settings = res[0];

        let bl = await query(`SELECT * FROM blacklist`);
        client.blacklist = bl;

        require('./util/eventLoader')(client);
        await client.login(res[0].token);
    },

    migration: async function() {
        let query = client.db;

        await query(`CREATE TABLE IF NOT EXISTS guilds(guild_id varchar(30), prefix varchar(10))`);
        await query(`CREATE TABLE IF NOT EXISTS settings(token varchar, prefix varchar(10))`);
        await query('CREATE TABLE IF NOT EXISTS roles(guild_id varchar(30), role_id varchar(30))');
        await query('CREATE TABLE IF NOT EXISTS user_roles(guild_id varchar(30), user_id varchar(30), role_id varchar(30))');
        await query(`ALTER TABLE settings ADD COLUMN owner_id varchar(30)`);
    }
}
