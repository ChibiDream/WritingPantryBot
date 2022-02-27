import SQLite from 'better-sqlite3';

export default function sqlReputation() {
    if (process.env.JEST_WORKER_ID !== undefined || process.env.NODE_ENV === 'test') {
        const sql = new SQLite("./Test-Reputation.sqlite");
        return sql;
    } else {
        const sql = new SQLite("./Reputation.sqlite");
        return sql;
    }
};