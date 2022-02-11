import SQLite from 'better-sqlite3';

export default function sqlReputation() {
    const sql = new SQLite("./Reputation.sqlite");
    return sql;
};