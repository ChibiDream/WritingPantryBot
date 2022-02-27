import { userReputationsTableExists, createUserReputationsTable } from './UserReputations.table';
import { getReputationCount, upsertUserReputation } from './UserReputations.queries';
import { UserReputation } from './UserReputations.type';

describe("UserReputations", () => {
    it("Creates a table for the user reputations", () => {
        expect(userReputationsTableExists()).toBe(false);
        createUserReputationsTable();
        expect(userReputationsTableExists()).toBe(true);
    });

    it("Upserts a UserReputation into the table", () => {
        const userRepInitial: UserReputation = {
            id: "123456789",
            user: "TestUser",
            user_url: "https://www.testuser.com",
            rep_count: 5
        }

        expect(() => upsertUserReputation(userRepInitial)).not.toThrowError();

        const userDataInitial = getReputationCount(userRepInitial.id);
        expect(userDataInitial).toMatchObject(userRepInitial);

        const userRepFinal: UserReputation = {
            id: "123456789",
            user: "TestUser",
            user_url: "https://www.testuser.com",
            rep_count: 6
        }

        expect(() => upsertUserReputation(userRepFinal)).not.toThrowError();
        
        const userDataFinal = getReputationCount(userRepInitial.id);
        expect(userDataFinal.id).toBe(userRepInitial.id);
        expect(userDataFinal.user).toBe(userRepInitial.user);
        expect(userDataFinal.user_url).toBe(userRepInitial.user_url);
        expect(userDataFinal.rep_count).not.toBe(userRepInitial.rep_count);
        expect(userDataFinal.rep_count).toBe(userRepFinal.rep_count);
    });

    it("Returns undefined when user id is not found", () => {
        expect(getReputationCount("987654321")).toBe(undefined);
    });
})