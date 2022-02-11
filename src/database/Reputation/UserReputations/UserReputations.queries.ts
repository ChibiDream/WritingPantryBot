import sql from '../Reputation.sql';
import { 
    UserReputation,
    UserReputationsTable 
} from './UserReputations.type';

export function getReputationCount(id: string): UserReputation | undefined {
    const connect = sql();

    const data = connect.prepare<string>(`
        SELECT * 
        FROM ${UserReputationsTable} 
        WHERE id = ?;`
    ).get(id);

    connect.close();

    if (data) return data;
}

export function upsertUserReputation(userReputation: UserReputation) {
    const connect = sql();

    connect.prepare<UserReputation>(`
        INSERT OR REPLACE INTO ${UserReputationsTable} (id, user, user_url, rep_count)
        VALUES (@id, @user, @user_url, @rep_count);
    `).run(userReputation);

    connect.close();
}