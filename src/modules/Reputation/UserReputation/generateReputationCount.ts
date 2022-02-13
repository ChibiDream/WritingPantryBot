import Discord from 'discord.js';

import { REPUTATION_EMBED_COLOR } from '../../../config/colors';

import { 
    getReputationCount 
} from '../../../database/Reputation/UserReputations/UserReputations.queries';

export default function generateReputationCount (user: Discord.User) {
    const userId = user.id;
    const repUser = getReputationCount(userId);

    let countEmbed = new Discord.MessageEmbed();
    countEmbed.setColor(REPUTATION_EMBED_COLOR);

    if (repUser) {
        countEmbed
            .setTitle('Rep Count')
            .setThumbnail(repUser.user_url)
            .setDescription(`${repUser.user} has ${repUser.rep_count} Reps`);
    } else {
        countEmbed
            .setTitle('Rep Count')
            .setDescription(`That user currently doesn't have any rep :(`);
    }

    return countEmbed;
}