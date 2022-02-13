import Discord from "discord.js";
import SECRET from "./src/config/secret";

import commandHandler from "./src/handlers/command.handler";
import readyHandler from "./src/handlers/ready.handler";
import buttonHandler from "./src/handlers/button.handler";

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

client.on("ready", () => {
    readyHandler(client);
});

client.on("interactionCreate", interaction => {
    if (interaction.isCommand()) {
        commandHandler(interaction);
    }
    else if (interaction.isButton()) {
        buttonHandler(interaction);
    }
});

client.login(SECRET);