import createUserReputationsTable from "./Reputation/UserReputations/UserReputations.table";
import createReputationMessagesTable from "./Reputation/ReputationMessages/ReputationMessages.table";

export function createDatabaseTables() {

    /* REPUTATION MODULE */

    // Creating tables (if they don't exist)
    createUserReputationsTable();
    createReputationMessagesTable();
}