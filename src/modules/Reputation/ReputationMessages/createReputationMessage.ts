import Discord from 'discord.js';

import { 
    createReputationMessage 
} from '../../../database/Reputation/ReputationMessages/ReputationMessages.queries';

export default function createRepMessage (message: Discord.Message<boolean>) {
    const userId = message.mentions.users.keys().next().value;
    const authorName = message.author.username;
    const authorUrl = message.author.avatarURL();
    if (!userId || !authorName || !authorUrl) return;

    let repMessage = message.content.substring(message.content.indexOf(">") + 2).trim();

    if (repMessage.length <= 0) {
        repMessage = "";
    }

    createReputationMessage({
        user_id: userId,
        message: repMessage,
        author_name: authorName,
        author_url: authorUrl
    });
}