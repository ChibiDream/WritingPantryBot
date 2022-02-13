import Discord from 'discord.js';

import { 
    postReputationMessage 
} from '../../../database/Reputation/ReputationMessages/ReputationMessages.queries';

export default function createRepMessage (author: Discord.User, user: Discord.User, message?: string) {
    const userId = user.id;
    const authorName = author.username;
    const authorUrl = author.avatarURL();
    if (!userId || !authorName || !authorUrl) return;

    if (!message) return;
    if (message.length <= 0) return;

    postReputationMessage({
        user_id: userId,
        message: message,
        author_name: authorName,
        author_url: authorUrl
    });
}