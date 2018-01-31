const Discord = module.require("discord.js");
const Nodesu = require("nodesu");

module.exports.run = async (client, message, args) => {
    let res = await client.db(`SELECT osu_key FROM SETTINGS`);
    if(!res[0]) return message.channel.send(`There is no osu api key set!`);
    let apiKey = res[0].osu_key;
    const osu = await new Nodesu.Client(apiKey);

    let text = args.slice(0).join(' ');

    let user = await osu.user.get(text);
    let g = await osu.user.getBest(text, 0, 5);
    str="";

    for(i=0;i<g.length;i++) {
        let play = g[i]
        b = await osu.beatmaps.getByBeatmapId(play.beatmap_id);

        var num300 = parseInt(play.count300),
        numGeki = parseInt(play.countgeki),
        num100 = parseInt(play.count100),
        numKatu = parseInt(play.countkatu),
        num50 = parseInt(play.count50), 
        numMiss = parseInt(play.countmiss);

        var topRow = ((50 * num50) + (100 * num100) + (300 * num300));
        var bottomRow = (3 * (numMiss + num50 + num100 + num300));
        accuracy =  Math.round(((topRow / bottomRow) * 100)) / 100;

        str+=`**${i+1}.** ${b[0].title}  https://osu.ppy.sh/b/${play.beatmap_id} \n**Rank:** ${play.rank} | **PP:** ${play.pp}\n**Score:** ${play.score} | **Combo:** ${play.maxcombo}\n**Acc:** ${accuracy} | **Stars:** ${parseFloat(b[0].difficultyrating).toFixed(2)}★\n\n`
    }

    let embed = new Discord.RichEmbed()
                            .setAuthor(`Top plays for ${user.username}`)
                            .setDescription(str)
                            .setThumbnail(`https://a.ppy.sh/${user.user_id}`)
                            .setColor('FFFFFF');


    message.channel.send(embed);
}

module.exports.help = {
    name: "osutop",
    description: "Checks a users top 5 plays.",
    usage: "osutop platinumft",
    type: "games"
}