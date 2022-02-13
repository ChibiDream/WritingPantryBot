import Discord from 'discord.js';
import { infoLog } from '../../logger';
import generateReputationMessages from '../modules/Reputation/ReputationMessages/generateReputationMessages';

export default async function buttonHandler (button: Discord.ButtonInteraction) {
    if (button.channel) {
        if (button.customId === 'pantry-bot-previous') {
            const footer = button.message.embeds[0]?.footer?.text;
            if (footer) {
                const userId = footer.split(" ")[5];
                const index = parseInt(footer.split(" ")[1]) - 1;
                await button.update(generateReputationMessages(userId, index - 1));
            }
        }
        else if (button.customId === 'pantry-bot-next') {
            const footer = button.message.embeds[0]?.footer?.text;
            if (footer) {
                const userId = footer.split(" ")[5];
                const index = parseInt(footer.split(" ")[1]) - 1;
                await button.update(generateReputationMessages(userId, index + 1));
            }
        }
    }
}