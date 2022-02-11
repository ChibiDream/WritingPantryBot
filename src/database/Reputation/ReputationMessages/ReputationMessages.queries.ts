import sql from '../Reputation.sql';
import { 
    RepuationMessage,
    CreateReputationMessageProps,
    RepuationMessagesTable 
} from './ReputationMessages.types';

export function getReputationMessagesByUser(id: string): RepuationMessage[] {
    const connect = sql();

    const data = connect.prepare<string>(`
        SELECT * 
        FROM ${RepuationMessagesTable} 
        WHERE user_id = ? AND message IS NOT NULL 
        ORDER BY created_at DESC;`
    ).get(id);

    connect.close();

    return data;
}

export function createReputationMessage(reputationMessage: CreateReputationMessageProps) {
    const connect = sql();

    connect.prepare<CreateReputationMessageProps>(`
        INSERT INTO ${RepuationMessagesTable} (user_id, message, author_name, author_url) 
        VALUES (@user_id, @message, @author_name, @author_url);`
    ).run(reputationMessage);

    connect.close();
}

export function getReputationLeaderboardByWeek(): {user_id: string, week_reps: number}[] {
    const connect = sql();

    const data = connect.prepare(`
        SELECT user_id, COUNT(*) AS week_reps 
        FROM ${RepuationMessagesTable}
        WHERE created_at > datetime('now', '-7 days') 
        GROUP BY user_id 
        HAVING week_reps > 0 
        ORDER BY week_reps DESC 
        LIMIT 5;
    `).all();

    connect.close();

    return data;
}

export function getReputationLeaderboardByMonth(): {user_id: string, month_reps: number}[] {
    const connect = sql();

    const data = connect.prepare(`
        SELECT user_id, COUNT(*) AS month_reps 
        FROM ${RepuationMessagesTable}
        WHERE created_at > datetime('now', '-1 month') 
        GROUP BY user_id 
        HAVING month_reps > 0 
        ORDER BY month_reps DESC 
        LIMIT 5;`
    ).all();

    connect.close();

    return data;
}

export function getReputationLeaderboardByAll(): {user_id: string, all_reps: number}[] {
    const connect = sql();

    const data = connect.prepare(`
        SELECT user_id, COUNT(*) AS all_reps 
        FROM ${RepuationMessagesTable} 
        GROUP BY user_id 
        HAVING all_reps > 0 
        ORDER BY all_reps DESC 
        LIMIT 5;`
    ).all();

    connect.close();

    return data;
}