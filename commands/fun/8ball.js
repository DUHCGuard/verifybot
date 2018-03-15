const Base = require("../../base/Command.js");

module.exports = class EightBall extends Base {
    constructor(client) {
        super(client, {
            name: "8ball",
            description: "Ask the magic 8ball a question.",
            usage: "<question>",
            category: "fun",
            permLevel: 0 
        });
    }

    run(message, args) {
        // Ignore if sent in dfchat
        if (message.channel.name === "dfchat") return super.error("You can't use that here!");
        // Error if message does not end in ?
        if (message.content.indexOf("?") !== message.content.length - 1) return super.error("That doesn't look like a question to me!");

        const responses = [
            "Definitely.",
            "Most likely.",
            "Cannot predict now.",
            "You may rely on it.",
            "Maybe, maybe not.",
            "It's a no from me.",
            "Absolutely not!",
            "Eeh, no."
            "Not sure about that.",
            "Uhh, can you ask me something else?",
            "I guess so?",
            "Possible.",
            "You shouldn't ask that!",
            "Without a doubt.",
            "For sure.",
            "Why would you even want to know that?"
        ];

        // Send a response
        message.channel.send(`**__${message.member.displayName}__ asks: __${args.join(" ")}__**\n${responses[Math.floor(Math.random() * responses.length)]}`);
    }
};
