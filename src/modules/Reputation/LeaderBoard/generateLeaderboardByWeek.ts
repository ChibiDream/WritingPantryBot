import Discord from 'discord.js';
import { REPUTATION_EMBED_COLOR } from '../../../config/colors';

import { 
    getReputationLeaderboardByWeek
} from '../../../database/Reputation/ReputationMessages/ReputationMessages.queries';

import { 
    getReputationCount 
} from '../../../database/Reputation/UserReputations/UserReputations.queries';

export default function generateLeaderboardByWeek(): Discord.MessageEmbed {
    const weekReps = getReputationLeaderboardByWeek();
    
    let boardEmbed = new Discord.MessageEmbed();
    boardEmbed
        .setColor(REPUTATION_EMBED_COLOR)
        .setTitle('Weekly Rep Count Board');

    if (weekReps.length > 0) {
        weekReps.forEach((week, i) => {
            const user = getReputationCount(week.user_id);
            if (user) {
                boardEmbed
                    .addField("User", user.user, true)
                    .addField("Weekly Rep", `${week.week_reps}`, true)
                    .addField('\u200b', '\u200b', true);
            }
        });
    } else {
        boardEmbed.setDescription("There are no users who have earned rep this week :(");
    }

    return boardEmbed;
}