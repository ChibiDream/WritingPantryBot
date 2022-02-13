import Discord, { Application } from 'discord.js';
import { infoLog } from '../../logger';
import SECRET from "../../src/config/secret";

import { 
    LeaderboardCommand,
    ReputationCommand,
    ReputationMessagesCommand,
    ReputationCountCommand
} from './Reputation.commands';

export default async function commandLoader(client: Discord.Client) {

    const hardcodedCommandList = [
        LeaderboardCommand,
        ReputationCommand,
        ReputationMessagesCommand,
        ReputationCountCommand
    ]

    if (client.application) {
        const data = await client.application.commands.set(hardcodedCommandList);
        infoLog.info("Loaded in commands", data.map(command => command.name));
    }
}