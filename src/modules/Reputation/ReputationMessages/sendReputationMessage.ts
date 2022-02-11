import Discord from 'discord.js';

import { REPUTATION_EMBED_COLOR } from '../../../config/colors';

import {
    getReputationMessagesByUser
} from '../../../database/Reputation/ReputationMessages/ReputationMessages.queries'

export default function sendReputationMessage (message: Discord.Message<boolean>) {
    const messageIndex = parseInt(message.content.substring(message.content.indexOf(">") + 1).trim()) - 1;
    const userId = message.mentions.users.keys().next().value;
    const repMessages = getReputationMessagesByUser(userId);
    let exampleEmbed = new Discord.MessageEmbed();
    exampleEmbed.setColor(REPUTATION_EMBED_COLOR);

    if (repMessages.length > 0) {
        if (0 <= messageIndex - 1 && messageIndex - 1 < repMessages.length) {
            exampleEmbed 
                .setTitle('Rep Message')
                .setDescription(repMessages[messageIndex].message)
                .setTimestamp(repMessages[messageIndex].created_at)
                .setFooter({ 
                    text:`Message ${messageIndex + 1} of ${repMessages.length}`, 
                    iconURL: repMessages[messageIndex].author_url
                });
        } else {
            exampleEmbed
                .setTitle('Rep Message')
                .setDescription(repMessages[0].message)
                .setTimestamp(repMessages[0].created_at)
                .setFooter({
                    text: `Message 1 of ${repMessages.length}`, 
                    iconURL: repMessages[0].author_url
                });
        }
    } else {
        exampleEmbed
            .setDescription("There are no rep messages for this user :(");
    }
    
    message.channel.send({embeds: [exampleEmbed]});
}

