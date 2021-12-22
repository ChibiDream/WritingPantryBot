const Discord = require("discord.js");
const COLORS = require("./config/colors");

exports.increaseRep = (client, message) => {
    const userId = message.mentions.users.keys().next().value;
    const username = message.mentions.users.get(userId).username;
    const userUrl = message.mentions.users.get(userId).avatarURL();
    let repCount = client.getRepCount.get(userId);

    if (!repCount) {
        repCount = {
            id: userId,
            user: username,
            user_url: userUrl,
            rep_count: 1
        }
    } else {
        repCount.user = username;
        repCount.user_url = userUrl;
        repCount.rep_count++;
    }

    client.setRepCount.run(repCount);
}

exports.addRepMessage = (client, message) => {
    const userId = message.mentions.users.keys().next().value;
    let repMessage = message.content.substring(message.content.indexOf(">") + 2).trim();
    const authorName = message.author.username;
    const authorUrl = message.author.avatarURL();

    if (repMessage.length <= 0) {
        repMessage = null;
    }

    client.addMessage.run({
        user_id: userId,
        message: repMessage,
        author_name: authorName,
        author_url: authorUrl
    });
}

exports.sendRepMessage = (client, message) => {
    const messageIndex = parseInt(message.content.substring(message.content.indexOf(">") + 1).trim()) - 1;
    const userId = message.mentions.users.keys().next().value;
    const repMessages = client.getMessages.all(userId);
    let exampleEmbed = new Discord.MessageEmbed();
    exampleEmbed.setColor(COLORS.REP_EMBED);

    if (repMessages.length > 0) {
        if (0 <= messageIndex - 1 && messageIndex - 1 < repMessages.length) {
            exampleEmbed 
                .setTitle('Rep Message')
                .setDescription(repMessages[messageIndex].message)
                .setTimestamp(repMessages[messageIndex].created_at)
                .setFooter(`Message ${messageIndex + 1} of ${repMessages.length}`, repMessages[messageIndex].author_url);
        } else {
            exampleEmbed
                .setTitle('Rep Message')
                .setDescription(repMessages[0].message)
                .setTimestamp(repMessages[0].created_at)
                .setFooter(`Message 1 of ${repMessages.length}`, repMessages[0].author_url);
        }
    } else {
        exampleEmbed
            .setDescription("There are no rep messages for this user :(");
    }
    
    message.channel.send({embeds: [exampleEmbed]});
}

exports.sendRepCount = (client, message) => {
    const userId = message.mentions.users.keys().next().value;
    const repUser = client.getRepCount.get(userId);

    let exampleEmbed = new Discord.MessageEmbed();
    exampleEmbed.setColor(COLORS.REP_EMBED);

    if (repUser) {
        exampleEmbed
            .setTitle('Rep Count')
            .setThumbnail(repUser.user_url)
            .setDescription(`${repUser.user} has ${repUser.rep_count} Reps`);
    } else {
        exampleEmbed
            .setTitle('Rep Count')
            .setDescription(`That user currently doesn't have any rep :(`);
    }

    message.channel.send({embeds: [exampleEmbed]});
}

exports.sendBoardWeekReps = (client, message) => {
    const weekReps = client.getBoardWeekReps.all();
    let exampleEmbed = new Discord.MessageEmbed();
    exampleEmbed
        .setColor(COLORS.REP_EMBED)
        .setTitle('Weekly Rep Count Board');

    console.log(weekReps);
    weekReps.forEach((week, i) => {
        const user = client.getRepCount.get(week.user_id);
        exampleEmbed
            .addField("User", user.user, true)
            .addField("Weekly Rep", `${week.week_reps}`, true)
            .addField('\u200b', '\u200b', true);
    });

    message.channel.send({embeds: [exampleEmbed]});
}

exports.sendBoardMonthReps = (client, message) => {
    const monthReps = client.getBoardMonthReps.all();
    let exampleEmbed = new Discord.MessageEmbed();
    exampleEmbed
        .setColor(COLORS.REP_EMBED)
        .setTitle('Monthly Rep Count Board');

    console.log(monthReps);
    monthReps.forEach((month, i) => {
        const user = client.getRepCount.get(month.user_id);
        exampleEmbed
            .addField("User", user.user, true)
            .addField("Monthly Rep", `${month.month_reps}`, true)
            .addField('\u200b', '\u200b', true);
    });

    message.channel.send({embeds: [exampleEmbed]});
}

exports.sendBoardAllTimeReps = (client, message) => {
    const allTimeReps = client.getBoardAllTimeReps.all();
    let exampleEmbed = new Discord.MessageEmbed();
    exampleEmbed
        .setColor(COLORS.REP_EMBED)
        .setTitle('All Time Rep Count Board');

    console.log(allTimeReps);
    allTimeReps.forEach((all, i) => {
        const user = client.getRepCount.get(all.user_id);
        exampleEmbed
            .addField("User", user.user, true)
            .addField("All Time Rep", `${all.all_reps}`, true)
            .addField('\u200b', '\u200b', true);
    });

    message.channel.send({embeds: [exampleEmbed]});
}