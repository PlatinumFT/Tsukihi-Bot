const bot = require('./app/bot.js');
const query = require('./app/pgsql.js');
const readlineSync = require('readline-sync');
const colors = require('colors');

run();

async function run() {
    await query("create table if not exists settings(token varchar, prefix varchar(10))");
    let res = await query("select * from settings");
    if(!res[0]) setup();
    else bot.run();
}

async function setup() {
    console.log(`Welcome to Platinum's Bot!`.bold.yellow + `\nTo get started using this bot, you will need to supply:`.bold.yellow + `\n - Your token\n - Your ID\n - A global prefix\n`.bold.blue);
    var token = readlineSync.question('Please paste your token here: ');
    var id = readlineSync.question('Please enter your ID: ');
    var prefix = readlineSync.question('Please select your prefix here: ');
}
/*functions = ['Start bot', 'Run migration'],
index = readlineSync.keyInSelect(functions, 'What would you like to run?');
switch(index) {
    case 0:
        bot.run();
        break;
    case 1:
        bot.migration();
        break;
}
*/
