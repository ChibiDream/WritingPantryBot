import { 
    reputationMessagesTableExists, 
    createReputationMessagesTable 
} from './ReputationMessages.table';

import { 
    postReputationMessage, 
    getReputationMessagesByUser,
    getReputationLeaderboardByWeek,
    getReputationLeaderboardByMonth,
    getReputationLeaderboardByAll
} from './ReputationMessages.queries';

import {
    CreateReputationMessageProps
} from './ReputationMessages.types';

describe("ReputationMessages", () => {
    it("Creates a table for the reputation messages", () => {
        expect(reputationMessagesTableExists()).toBe(false);
        createReputationMessagesTable();
        expect(reputationMessagesTableExists()).toBe(true);
    });

    it("Posts a new reputation message", () => {
        const repMsg: CreateReputationMessageProps = {
            user_id: "123456789",
            message: "This is a test",
            author_name: "TestAuthor",
            author_url: "https://www.testauthor.com"
        } 

        expect(() => postReputationMessage(repMsg)).not.toThrowError();

        const repMsgData = getReputationMessagesByUser(repMsg.user_id);
        expect(repMsgData.length).toBe(1);

        const msgData = repMsgData[0];
        expect(msgData).toMatchObject(repMsg);
    });

    it("Posts a null reputation message", () => {
        const repMsg: CreateReputationMessageProps = {
            user_id: "123456789",
            message: null,
            author_name: "TestAuthor",
            author_url: "https://www.testauthor.com"
        } 

        expect(() => postReputationMessage(repMsg)).not.toThrowError();

        const repMsgData = getReputationMessagesByUser(repMsg.user_id);
        expect(repMsgData.length).toBe(1);
        expect(repMsgData[0]).not.toBe(null);
    });
});