import Discord from 'discord.js';

import { 
    getReputationCount,
    upsertUserReputation
} from '../../../database/Reputation/UserReputations/UserReputations.queries';

export default function increaseReputation(message: Discord.Message<boolean>) {
    const userId = message.mentions?.users.keys().next().value;
    const username = message.mentions?.users.get(userId)?.username;
    const userUrl = message.mentions?.users.get(userId)?.avatarURL();
    if (!userId || !username || !userUrl) return;

    let repCount = getReputationCount(userId);

    if (!repCount) {
        repCount = {
            id: userId,
            user: username,
            user_url: userUrl,
            rep_count: 1
        }
    } else {
        repCount.user = username;
        repCount.user_url = userUrl;
        repCount.rep_count++;
    }

    upsertUserReputation(repCount);
}