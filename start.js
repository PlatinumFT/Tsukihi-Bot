const bot = require('./app/bot.js');
const query = require('./app/pgsql.js');
const readlineSync = require('readline-sync');

run();

async function run() {
    let res = await query("select * from settings");
    if(!res[0]) return console.log('There is nothing here!');

    bot.run();
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
