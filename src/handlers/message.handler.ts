import Discord from 'discord.js';
import sendHelpMessage from '../modules/Help/sendHelpMessage';
import sendByAll from '../modules/Reputation/LeaderBoard/sendByAll';
import sendByMonth from '../modules/Reputation/LeaderBoard/sendByMonth';
import sendByWeek from '../modules/Reputation/LeaderBoard/sendByWeek';
import createReputationMessage from '../modules/Reputation/ReputationMessages/createReputationMessage';
import sendReputationMessage from '../modules/Reputation/ReputationMessages/sendReputationMessage';
import increaseReputation from '../modules/Reputation/UserReputation/increaseReputation';
import sendReputationCount from '../modules/Reputation/UserReputation/sendReputationCount';



export default function messageHandler (client: Discord.Client<boolean>, message: Discord.Message<boolean>) {
    if (message.mentions.users.size == 1) {
        if (message.content.substring(0, 5) == "(rep)") {
            increaseReputation(message);
            createReputationMessage(message);
        }   
        else if (message.content.substring(0, 5) == "(msg)") {
            sendReputationMessage(message);
        }
        else if (message.content.substring(0, 7) == "(count)") {
            sendReputationCount(message);
        }
    } else {
        if (message.content.substring(0, 6) == "(week)") {
            sendByWeek(message);
        } else if (message.content.substring(0, 7) == "(month)") {
            sendByMonth(message);
        } else if (message.content.substring(0, 5) == "(all)") {
            sendByAll(message)
        } else if (message.content.substring(0, 6) == "(help)") {
            sendHelpMessage(message);
        }
    }
}