import Discord from 'discord.js';

import { 
    getReputationCount,
    upsertUserReputation
} from '../../../database/Reputation/UserReputations/UserReputations.queries';

export default function increaseReputation(user: Discord.User) {
    const userId = user.id;
    const username = user.username;
    const userUrl = user.avatarURL();
    
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