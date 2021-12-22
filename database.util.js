exports.createTables = (sql) => {
    const scoresTable = sql.prepare(`SELECT count(*) FROM sqlite_master 
                               WHERE type='table' AND name = 'reps';`
                             ).get();
    const messagesTable = sql.prepare(`SELECT count(*) FROM sqlite_master 
                                       WHERE type='table' AND name = 'messages';`
                                     ).get();
    if (!scoresTable['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        sql.prepare(`CREATE TABLE reps (
                                          id TEXT PRIMARY KEY,
                                          user TEXT,
                                          user_url TEXT,
                                          rep_count INTEGER
                                       );`).run();
        // Ensure that the "id" row is always unique and indexed.
        sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON reps (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }

    if (!messagesTable['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        sql.prepare(`CREATE TABLE messages (
                                        user_id TEXT,
                                        message TEXT,
                                        author_name TEXT,
                                        author_url TEXT,
                                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                        FOREIGN KEY (user_id) REFERENCES reps(id)
                                       );`).run();
        // Ensure that the "id" row is always unique and indexed.
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }
}

exports.prepareStatements = (client, sql) => {
    // And then we have two prepared statements to get and set the score data.
    client.getRepCount = sql.prepare("SELECT * FROM reps WHERE id = ?;");
    client.setRepCount = sql.prepare("INSERT OR REPLACE INTO reps (id, user, user_url, rep_count) VALUES (@id, @user, @user_url, @rep_count);");
    client.getMessages = sql.prepare("SELECT * FROM messages WHERE user_id = ? AND message IS NOT NULL ORDER BY created_at DESC;");
    client.addMessage = sql.prepare("INSERT INTO messages (user_id, message, author_name, author_url) VALUES (@user_id, @message, @author_name, @author_url);");

    // Leader Board API Calls
    client.getBoardWeekReps = sql.prepare("SELECT user_id, COUNT(*) AS week_reps FROM messages WHERE created_at > datetime('now', '-7 days') GROUP BY user_id HAVING week_reps > 0 ORDER BY week_reps DESC LIMIT 5;");
    client.getBoardMonthReps = sql.prepare("SELECT user_id, COUNT(*) AS month_reps FROM messages WHERE created_at > datetime('now', '-1 month') GROUP BY user_id HAVING month_reps > 0 ORDER BY month_reps DESC LIMIT 5;");
    client.getBoardAllTimeReps = sql.prepare("SELECT user_id, COUNT(*) AS all_reps FROM messages GROUP BY user_id HAVING all_reps > 0 ORDER BY all_reps DESC LIMIT 5;");
}