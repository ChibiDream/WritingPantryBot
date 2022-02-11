import Discord from 'discord.js';

import { REPUTATION_EMBED_COLOR } from '../../../config/colors';

import { 
    getReputationCount 
} from '../../../database/Reputation/UserReputations/UserReputations.queries';

export default function sendReputationCount (message: Discord.Message<boolean>) {
    const userId = message.mentions.users.keys().next().value;
    const repUser = getReputationCount(userId);

    let exampleEmbed = new Discord.MessageEmbed();
    exampleEmbed.setColor(REPUTATION_EMBED_COLOR);

    if (repUser) {
        exampleEmbed
            .setTitle('Rep Count')
            .setThumbnail(repUser.user_url)
            .setDescription(`${repUser.user} has ${repUser.rep_count} Reps`);
    } else {
        exampleEmbed
            .setTitle('Rep Count')
            .setDescription(`That user currently doesn't have any rep :(`);
    }

    message.channel.send({embeds: [exampleEmbed]});
}