import Discord from 'discord.js';

import generateLeaderboardByAll from '../modules/Reputation/LeaderBoard/generateLeaderboardByAll';
import generateLeaderboardByMonth from '../modules/Reputation/LeaderBoard/generateLeaderboardByMonth';
import generateLeaderboardByWeek from '../modules/Reputation/LeaderBoard/generateLeaderboardByWeek';
import createReputationMessage from '../modules/Reputation/ReputationMessages/createReputationMessage';
import generateReputationMessages from '../modules/Reputation/ReputationMessages/generateReputationMessages';
import generateReputationCount from '../modules/Reputation/UserReputation/generateReputationCount';
import increaseReputation from '../modules/Reputation/UserReputation/increaseReputation';
import generateReputationMessageReply from '../modules/Reputation/ReputationMessages/generateReputationMessageReply';

export default function commandHandler(command: Discord.CommandInteraction) {
    const author = command.user;
    const commandName = command.commandName;    

    if (commandName == "leaderboard") {
        const subcommand = command.options.getSubcommand(false);

        if (subcommand == "all") {
            command.reply({embeds: [generateLeaderboardByAll()]});
        } 
        else if (subcommand == "month") {
            command.reply({embeds: [generateLeaderboardByMonth()]});
        }
        else if (subcommand == "week") {
            command.reply({embeds: [generateLeaderboardByWeek()]});
        }
    }
    else if (commandName == "rep") {
        const user = command.options.getUser("user", false);
        const str = command.options.getString("string", false);
        
        if (user) {
            increaseReputation(user);

            if (str) {
                createReputationMessage(author, user, str);
                command.reply({embeds: [generateReputationMessageReply(user, author, str)]});
            }
            else {
                command.reply({embeds: [generateReputationMessageReply(user, author)]});
            }
        }
    }
    else if (commandName == "rep-messages") {
        const user = command.options.getUser("user", false);
        if (user) {
            command.reply(generateReputationMessages(user.id));
        }
    }
    else if (commandName == "rep-count") {
        const user = command.options.getUser("user", false);
        if (user) {
            command.reply({embeds: [generateReputationCount(user)]});
        }
    }
}