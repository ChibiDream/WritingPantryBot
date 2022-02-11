import Discord from 'discord.js';
import { createDatabaseTables } from '../database/setup';

export default function readyHandler (client: Discord.Client<boolean>) {
    if (client.user) {
        client.user.setActivity(`(help) at the start of any message.`, {type: 2});
    }

    // Run All Database Table Creation Commands
    createDatabaseTables();
}