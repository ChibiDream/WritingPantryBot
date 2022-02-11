import sql from '../Reputation.sql';
import { UserReputationsTable } from './UserReputations.type';

export default function createUserReputationsTable() {
    const connect = sql();

    const scoresTable = connect.prepare(`
        SELECT count(*) 
        FROM sqlite_master 
        WHERE type='table' AND name = '${UserReputationsTable}';`
    ).get();
    
    if (!scoresTable['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        connect.prepare(`CREATE TABLE ${UserReputationsTable} (
            id TEXT PRIMARY KEY,
            user TEXT,
            user_url TEXT,
            rep_count INTEGER
        );`).run();

        // Ensure that the "id" row is always unique and indexed.
        connect.prepare(`CREATE UNIQUE INDEX idx_scores_id ON ${UserReputationsTable} (id);`).run();
        connect.pragma(`synchronous = 1`);
        connect.pragma(`journal_mode = wal`);
    }

    connect.close();
}