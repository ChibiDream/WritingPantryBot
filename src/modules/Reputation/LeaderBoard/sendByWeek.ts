import Discord from 'discord.js';
import { REPUTATION_EMBED_COLOR } from '../../../config/colors';

import { 
    getReputationLeaderboardByWeek
} from '../../../database/Reputation/ReputationMessages/ReputationMessages.queries';

import { 
    getReputationCount 
} from '../../../database/Reputation/UserReputations/UserReputations.queries';

export default function sendByWeek (message: Discord.Message<boolean>) {
    const weekReps = getReputationLeaderboardByWeek();
    
    let exampleEmbed = new Discord.MessageEmbed();
    exampleEmbed
        .setColor(REPUTATION_EMBED_COLOR)
        .setTitle('Weekly Rep Count Board');

    if (weekReps.length > 0) {
        weekReps.forEach((week, i) => {
            const user = getReputationCount(week.user_id);
            if (user) {
                exampleEmbed
                    .addField("User", user.user, true)
                    .addField("Weekly Rep", `${week.week_reps}`, true)
                    .addField('\u200b', '\u200b', true);
            }
        });
    } else {
        exampleEmbed.setDescription("There are no users who have earned rep this week :(");
    }

    message.channel.send({embeds: [exampleEmbed]});
}