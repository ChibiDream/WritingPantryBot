import sql from '../Reputation.sql';
import { RepuationMessagesTable } from './ReputationMessages.types';
import { UserReputationsTable } from '../UserReputations/UserReputations.type';

export default function createReputationMessagesTable() {
    const connect = sql();

    const messagesTable = connect.prepare(`
        SELECT count(*) 
        FROM sqlite_master 
        WHERE type='table' AND name = '${RepuationMessagesTable}';`
    ).get();

    if (!messagesTable['count(*)']) {

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
    }

    connect.close();
}