import { infoLog } from '../../../../logger';
import sql from '../Reputation.sql';
import { UserReputationsTable } from './UserReputations.type';

export default function createUserReputationsTable() {
    const connect = sql();

    const userRepTable = connect.prepare(`
        SELECT count(*) 
        FROM sqlite_master 
        WHERE type='table' AND name = '${UserReputationsTable}';`
    ).get();
    
    if (!userRepTable['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        connect.prepare(`CREATE TABLE ${UserReputationsTable} (
            id TEXT PRIMARY KEY,
            user TEXT,
            user_url TEXT,
            rep_count INTEGER
        );`).run();

        // Ensure that the "id" row is always unique and indexed.
        connect.prepare(`CREATE UNIQUE INDEX idx_${UserReputationsTable}_id ON ${UserReputationsTable} (id);`).run();
        connect.pragma(`synchronous = 1`);
        connect.pragma(`journal_mode = wal`);

        infoLog.info(`${UserReputationsTable} table created`)
    }

    connect.close();
}