import Discord from 'discord.js';

export const LeaderboardCommand: Discord.ApplicationCommandDataResolvable = {
    name: "leaderboard",
    description: "See the top five people who have earned the most reputation",
    type: "CHAT_INPUT",
    options: [
        {
            name: "all",
            description: "See the top five people who have earned the most reputation ever",
            type: "SUB_COMMAND"
        },
        {
            name: "month",
            description: "See the top five people who have earned the most reputation in the past month",
            type: "SUB_COMMAND"
        },
        {
            name: "week",
            description: "See the top five people who have earned the most reputation in the past week",
            type: "SUB_COMMAND"
        }
    ]
}

export const ReputationCommand: Discord.ApplicationCommandDataResolvable = {
    name: "rep",
    description: "Give a user one reputation for being an especially good person",
    type: "CHAT_INPUT",
    options: [
        {
            name: "user",
            description: "The user you're trying to rep",
            type: "USER",
            required: true
        },
        {
            name: "string",
            description: "Add a message to your rep as a note for why they made you happy",
            type: "STRING",
            required: false
        }
    ]
}

export const ReputationMessagesCommand: Discord.ApplicationCommandDataResolvable = {
    name: "rep-messages",
    description: "See the rep messages that have been made for a user",
    type: "CHAT_INPUT",
    options: [
        {
            name: "user",
            description: "The user you're trying to see rep messages of",
            type: "USER",
            required: true
        }
    ]
}

export const ReputationCountCommand: Discord.ApplicationCommandDataResolvable = {
    name: "rep-count",
    description: "See the reps that a user has accumulated",
    type: "CHAT_INPUT",
    options: [
        {
            name: "user",
            description: "The user you're trying to see rep counts of",
            type: "USER",
            required: true
        }
    ]
}