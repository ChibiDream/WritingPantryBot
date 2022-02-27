import sql from '../Reputation.sql';
import { RepuationMessagesTable } from './ReputationMessages.types';
import { UserReputationsTable } from '../UserReputations/UserReputations.type';
import { infoLog } from '../../../../logger';

export function createReputationMessagesTable() {
    const connect = sql();

    if (!reputationMessagesTableExists()) {

        // If the table isn't there, create it and setup the database correctly.
        connect.prepare(`CREATE TABLE ${RepuationMessagesTable} (
            user_id TEXT,
            message TEXT,
            author_name TEXT,
            author_url TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES ${UserReputationsTable}(id)
        );`).run();

        // Ensure that the "id" row is always unique and indexed.
        connect.pragma("synchronous = 1");
        connect.pragma("journal_mode = wal");

        infoLog.info(`${RepuationMessagesTable} table created`);
    }

    connect.close();
}

export function reputationMessagesTableExists(): boolean {
    const connect = sql();

    // Counts how many of the UserRepuationsTables exist (should be 0 or 1)
    const messagesTable = connect.prepare(`
        SELECT count(*) 
        FROM sqlite_master 
        WHERE type='table' AND name = '${RepuationMessagesTable}';`
    ).get();

    connect.close();

    // 0 or 1 does not appear to auto convert to boolean on return
    return (messagesTable['count(*)'] ? true : false);
}