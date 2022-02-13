import Discord from 'discord.js';

import { REPUTATION_EMBED_COLOR } from '../../../config/colors';

export default function generateReputationCount (user: Discord.User, author: Discord.User, msg?: string) {
    const authorUrl = author.avatarURL();

    let replyEmbed = new Discord.MessageEmbed();

    if (msg) {
        replyEmbed
            .setColor(REPUTATION_EMBED_COLOR)
            .setTitle('Rep Message')
            .setDescription(`${author.username} just rep'd ${user.username}`)
            .setTimestamp(Date.now())
            .addField("Message", msg, false)
            .setFooter({
                text: "Rep Increase",
                iconURL: (authorUrl ? authorUrl : "")
            });
    }
    else {
        replyEmbed
            .setColor(REPUTATION_EMBED_COLOR)
            .setTitle('Rep Message')
            .setDescription(`${author.username} just rep'd ${user.username}`)
            .setTimestamp(Date.now())
            .setFooter({
                text: "Rep Increase",
                iconURL: (authorUrl ? authorUrl : "")
            });
    }

    return replyEmbed;
}