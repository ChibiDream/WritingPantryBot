export const RepuationMessagesTable = "reputation_messages";

export type RepuationMessage = {
    user_id: string;
    message: string;
    author_name: string;
    author_url: string;
    created_at: Date;
}

export type CreateReputationMessageProps = {
    user_id: string;
    message: string | null;
    author_name: string;
    author_url: string;
}