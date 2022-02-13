import Discord from 'discord.js';
import { createDatabaseTables } from '../database/setup';
import { infoLog } from '../../logger';
import commandLoader from '../commands/commands';

export default function readyHandler (client: Discord.Client<boolean>) {
    infoLog.info("Client.onReady triggered");

    if (client.user) {
        client.user.setActivity(`(help) at the start of any message.`, {type: 2});
        infoLog.info("Client activity set");
    }

    // Run All Database Table Creation Commands
    createDatabaseTables();

    // Create, Delete, and Update command list if necessary
    commandLoader(client);
}