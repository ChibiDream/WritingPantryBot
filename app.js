const Discord = require("discord.js");
const SECRET = require("./config/secret");
const SQLite = require("better-sqlite3");
const sql = new SQLite("./scores.sqlite");
const dbUtils = require("./src/database.util");
const repUtils = require("./src/rep.util");
const helpUtils = require("./src/help.util");

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

client.on("ready", () => {
    console.log(`Logged in as Writing Pantry Bot.`);
    client.user.setActivity(`(help) at the start of any message.`, {type: 2});

    dbUtils.createTables(sql);
    dbUtils.prepareStatements(client, sql);
    console.log(`Database has been prepared.`);
});

client.on("messageCreate", message => {
    if (message.author.bot) return;

    if (message.mentions.users.size == 1) {
        if (message.content.substring(0, 5) == "(rep)") {
            repUtils.increaseRep(client, message);
            repUtils.addRepMessage(client, message);
        }
        else if (message.content.substring(0, 5) == "(msg)") {
            repUtils.sendRepMessage(client, message);
        }
        else if (message.content.substring(0, 7) == "(count)") {
            repUtils.sendRepCount(client, message);
        }
    } else {
        if (message.content.substring(0, 6) == "(week)") {
            repUtils.sendBoardWeekReps(client, message);
        } else if (message.content.substring(0, 7) == "(month)") {
            repUtils.sendBoardMonthReps(client, message);
        } else if (message.content.substring(0, 5) == "(all)") {
            repUtils.sendBoardAllTimeReps(client, message);
        } else if (message.content.substring(0, 6) == "(help)") {
            helpUtils.sendHelpMessage(message);
        }
    }
});

client.login(SECRET);