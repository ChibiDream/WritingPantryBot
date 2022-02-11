import Discord from 'discord.js';
import { REPUTATION_EMBED_COLOR } from '../../config/colors';

export default function sendHelpMessage(message: Discord.Message<boolean>) {
    let exampleEmbed = new Discord.MessageEmbed();
    exampleEmbed
        .setColor(REPUTATION_EMBED_COLOR)
        .setTitle("Bot Command List")
        .addField("(rep) @<user> [message]", "Gives a reputation point to the <user> and provides an option [message] for why they were repped.")
        .addField("(count) @<user>", "See the reputation points for a certain <user>.")
        .addField("(msg) @<user> [message_number]", "See the rep messages that have been made for a given user, with an option to get a certain [message_number].")
        .addField("(week)", "See the users who have earned the most reputation points in the last week.")
        .addField("(month)", "See the users who have earned the most reputation points in the last month.")
        .addField("(all)", "See the users who have earned the most reputation points ever.")
        .addField("(help)", "See the bot command list.");
    message.channel.send({embeds: [exampleEmbed]});
}