export const UserReputationsTable = "user_reputations";

export type UserReputation = {
    id: string;
    user: string;
    user_url: string;
    rep_count: number;
}