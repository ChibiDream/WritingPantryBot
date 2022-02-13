import Discord from 'discord.js';
import { infoLog } from '../../../../logger';

import { REPUTATION_EMBED_COLOR } from '../../../config/colors';

import {
    getReputationMessagesByUser
} from '../../../database/Reputation/ReputationMessages/ReputationMessages.queries'
import { RepuationMessage } from '../../../database/Reputation/ReputationMessages/ReputationMessages.types';

export default function generateReputationMessages(userId: string, index?: number) {
    const repMessages = getReputationMessagesByUser(userId);
    infoLog.info(`Loaded ${repMessages.length} Reputation Messages for user ${userId}`);

    if (!index) index = 0;

    return {
        embeds: [generateEmbed(repMessages, userId, index)], 
        components: [generateButtons(repMessages.length, index)]
    };
}

function generateEmbed(repMessages: RepuationMessage[], userId: string, index: number) {
    const messagesEmbed = new Discord.MessageEmbed();
    messagesEmbed.setColor(REPUTATION_EMBED_COLOR);

    if (0 <= index && index < repMessages.length) {
        messagesEmbed 
            .setTitle(`Rep Messages for `)
            .setDescription(repMessages[index].message)
            .setTimestamp(repMessages[index].created_at)
            .setFooter({ 
                text:`Message ${index + 1} of ${repMessages.length} for ${userId}`, 
                iconURL: repMessages[index].author_url
            });
    } 
    else if (repMessages.length > 0){
        messagesEmbed 
            .setTitle('Rep Message')
            .setDescription(repMessages[0].message)
            .setTimestamp(repMessages[0].created_at)
            .setFooter({ 
                text:`Message ${1} of ${repMessages.length} for ${userId}`, 
                iconURL: repMessages[0].author_url
            });
    }else {
        messagesEmbed
            .setDescription("There are no rep messages for this user :(");
    }

    return messagesEmbed;
}

function generateButtons(messageCount: number, index: number) {
    const prevButton = new Discord.MessageButton();
    prevButton
        .setCustomId("pantry-bot-previous")
        .setLabel("Previous")
        .setStyle("PRIMARY");

    const nextButton = new Discord.MessageButton();
    nextButton
        .setCustomId("pantry-bot-next")
        .setLabel("Next")
        .setStyle("PRIMARY");

    if (index == messageCount - 1 || messageCount == 0) {
        nextButton.setDisabled(true);
    }

    if (index == 0) {
        prevButton.setDisabled(true);
    }

    const actionRow = new Discord.MessageActionRow();
    actionRow.addComponents([prevButton, nextButton]);

    return actionRow;
}
