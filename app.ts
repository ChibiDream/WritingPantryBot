import Discord from "discord.js";
import SECRET from "./src/config/secret";

import readyHandler from "./src/handlers/ready.handler";
import messageHandler from "./src/handlers/message.handler";

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

client.on("ready", () => {
    readyHandler(client);
});

client.on("messageCreate", message => {
    if (message.author.bot) return;
    messageHandler(client, message);
});

client.login(SECRET);