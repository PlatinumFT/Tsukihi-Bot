const Discord = require("discord.js");
const express = require('express');
var path = require('path');
var passport = require('passport');
session  = require('express-session')
var DiscordStrategy = require('passport-discord').Strategy
var refresh = require('passport-oauth2-refresh');
var scopes = ['identify', 'email', /* 'connections', (it is currently broken) */ 'guilds', 'guilds.join'];

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

        var discordStrat = new DiscordStrategy({
            clientID: '396425352072921088',
            clientSecret: 'Ph-bNVv-WHf7qF9aW4aq7B9zun9IF_Br',
            callbackURL: 'http://localhost:3000/callback'
        }, function(accessToken, refreshToken, profile, cb) {
            profile.refreshToken = refreshToken; // store this for later refreshes
            User.findOrCreate({ discordId: profile.id }, function(err, user) {
                if (err)
                    return done(err);
         
                return cb(err, user);
            });
        });

        passport.use(new DiscordStrategy({
            clientID: '396425352072921088',
            clientSecret: 'Ph-bNVv-WHf7qF9aW4aq7B9zun9IF_Br',
            callbackURL: 'http://localhost:3000/callback',
            scope: scopes
        }, function(accessToken, refreshToken, profile, done) {
            process.nextTick(function() {
                return done(null, profile);
            });
        }));
        refresh.use(discordStrat);
        app.use(session({
            secret: 'keyboard cat',
            resave: true,
            saveUninitialized: true
        }));
        app.use(passport.initialize());
        app.use(passport.session());

        app.set('views', path.join(__dirname, 'webapp/views'));
        app.set('view engine', 'ejs');

        app.get('/login', passport.authenticate('discord', { scope: scopes }), function(req, res) {});
        app.get('/callback',
            passport.authenticate('discord', { failureRedirect: '/login' }), function(req, res) { res.redirect('/info') } // auth success
        );
        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/login');
        });
        app.get('/info', checkAuth, function(req, res) {
            //console.log(req.user)
            res.json(req.user);
        });

        app.get('/user_roles/:id', checkAuth, async function(req, res) {
            let id = req.params.id;
            let result = await client.db(`select * from user_roles where user_id = '${id}'`);
            res.send(result);
        });

        app.get('/guild/:id', checkAuth, async function(req, res) {
            let id = req.params.id;
            let result = await client.guilds.get(id);
            let r = {
                guild: result,
                icon: result.iconURL
            }

            if(result) res.send(r)
            else res.send(null);
        })

        app.get('/role/:guild_id/:role_id', checkAuth, async function(req, res) {
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

        app.get('/command_log', checkAuth, async function(req, res) {
            let result = await client.db(`select * from command_log`);
            let d = [];
            for(i=0; i<result.length;i++) {
                let channel;
                if(result[i].channel_id) {
                    let guild = await client.guilds.get(result[i].guild_id)
                    channel = await guild.channels.get(result[i].channel_id);
                }

                d.push({
                    data: result[i],
                    channel: channel
                })
            }
            if(result) res.send(d);
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


function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.send('not logged in :(');
}

passport.serializeUser(function(user, done) {
    done(null, user);
  });
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});