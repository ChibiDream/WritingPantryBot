import Discord from 'discord.js';
import { REPUTATION_EMBED_COLOR } from '../../../config/colors';

import {
    getReputationLeaderboardByAll 
} from '../../../database/Reputation/ReputationMessages/ReputationMessages.queries';

import { 
    getReputationCount 
} from '../../../database/Reputation/UserReputations/UserReputations.queries';

export default function sendByAll(message: Discord.Message<boolean>) {
    const allTimeReps = getReputationLeaderboardByAll();

    let exampleEmbed = new Discord.MessageEmbed();
    exampleEmbed
        .setColor(REPUTATION_EMBED_COLOR)
        .setTitle('All Time Rep Count Board');

    if (allTimeReps.length > 0) {
        allTimeReps.forEach((all, i) => {
            const user = getReputationCount(all.user_id);
            if (user) {
                exampleEmbed
                    .addField("User", user.user, true)
                    .addField("All Time Rep", `${all.all_reps}`, true)
                    .addField('\u200b', '\u200b', true);
            }
        });
    } else {
        exampleEmbed.setDescription("There are no users with rep currently :(");
    }

    message.channel.send({embeds: [exampleEmbed]});
}