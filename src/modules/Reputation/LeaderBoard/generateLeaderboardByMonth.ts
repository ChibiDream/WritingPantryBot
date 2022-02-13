import Discord from 'discord.js';
import { REPUTATION_EMBED_COLOR } from '../../../config/colors';

import {
    getReputationLeaderboardByMonth
} from '../../../database/Reputation/ReputationMessages/ReputationMessages.queries';

import { 
    getReputationCount 
} from '../../../database/Reputation/UserReputations/UserReputations.queries';

export default function generateLeaderboardByMonth(): Discord.MessageEmbed {
    const monthReps = getReputationLeaderboardByMonth();

    let boardEmbed = new Discord.MessageEmbed();
    boardEmbed
        .setColor(REPUTATION_EMBED_COLOR)
        .setTitle('Monthly Rep Count Board');

    if (monthReps.length > 0) {
        monthReps.forEach((month, i) => {
            const user = getReputationCount(month.user_id);
            if (user) {
                boardEmbed
                    .addField("User", user.user, true)
                    .addField("Monthly Rep", `${month.month_reps}`, true)
                    .addField('\u200b', '\u200b', true);
            }
        });
    } else {
        boardEmbed.setDescription("There are no users who have earned rep this month :(");
    }

    return boardEmbed;
}