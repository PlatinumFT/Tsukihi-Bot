const Discord = require("discord.js");
const express = require('express');
var path = require('path');

const client = new Discord.Client({disableEveryone: true});
      client.db = require('./pgsql.js');
      client.findUser = require('./util/userFinder.js');
      client.findColour = require('./util/colourFinder.js');
      client.xp = {};
      client.globalxp = {};
module.exports = {
    run: async function() {
        await funcs.run();
    }
}

funcs = {
    run: async function() {
        let query = client.db;

        let res = await query(`SELECT * FROM SETTINGS`);
        client.settings = res[0];

        let bl = await query(`SELECT * FROM blacklist`);
        client.blacklist = bl;

        require('./util/eventLoader')(client);
        await client.login(res[0].token);

        funcs.webapp();
    },

    webapp: async function() {
        let app = express();

        app.use(express.static(path.join(__dirname, 'webapp/public')));
        app.use(express.static(path.join(__dirname, '../bower_components')));

        app.set('views', path.join(__dirname, 'webapp/views'));
        app.set('view engine', 'ejs');

        app.get('/user_roles/:id', async function(req, res) {
            let id = req.params.id;
            let result = await client.db(`select * from user_roles where user_id = '${id}'`);
            res.send(result);
        });

        app.get('/guild/:id', async function(req, res) {
            let id = req.params.id;
            let result = await client.guilds.get(id);
            let r = {
                guild: result,
                icon: result.iconURL
            }

            if(result) res.send(r)
            else res.send(null);
        })

        app.get('/role/:guild_id/:role_id', async function(req, res) {
            let guild_id = req.params.guild_id;
            let role_id = req.params.role_id;

            let guild = await client.guilds.get(guild_id);
            let role = await guild.roles.get(role_id);

            let r = {
                guild: guild,
                role: role,
                icon: guild.iconURL
            }

            if(guild) res.send(r)
            else res.send(null);
        })

        app.get('/command_log', async function(req, res) {
            let result = await client.db(`select * from command_log`);
            for(i=0; i<result.length;i++) {
                if(result[i].guild_id) {
                    result[i].guild = await client.guilds.get(result[i].guild_id);
                }
                if(result[i].channel_id) {
                    result[i].channel = await result[i].guild.channels.get(result[i].channel_id);
                }
            }
            if(result) res.send(JSON.stringify(result));
        })

        app.get('/dashboard', function(req, res) {
            res.render('dashboard');
        })

        app.get('/', function(req, res) {
            res.render('index');
        })

        app.listen(3000, (req, res) => console.log('Started!'))
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