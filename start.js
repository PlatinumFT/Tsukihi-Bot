const bot = require('./app/bot.js');
const readlineSync = require('readline-sync');

functions = ['Start bot', 'Run migration'],
index = readlineSync.keyInSelect(functions, 'What would you like to run?');
switch(index) {
    case 0:
        bot.run();
        break;
    case 1:
        bot.migration();
        break;
}