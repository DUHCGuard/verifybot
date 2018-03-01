const config = require("../config.json");

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(member) {
        // Find the joins channel
        const channel = member.guild.channels.find("name", config.channels.joins);
        // If no channel found, return
        if (!channel) return;
        
        // Create a new embed
        const embed = new channel.buildEmbed(this.client.config.embedTemplate)
            .setColor([67, 181, 129])
            .setThumbnail(member.user.avatarURL({ size: 256, format: "png" }))
            .setDescription("<:joined:401925850846724106> | New member joined.")
            .setTimestamp();

        // Fetch verification data
        const data = await this.client.query(`SELECT player_name, player_uuid FROM linked_accounts WHERE discord_id = '${member.id}';`);

        embed.addField("» Discord Tag", member.user.tag, true);
        embed.addField("» Joined Discord", this.humanize(member.user.createdAt), true);
        embed.addField("» Previously Verified?", data[0] ? `Yes. (as ${data[0].player_name})` : "No.", true);
        embed.addField("» Current Member Count", member.guild.memberCount, true);
        embed.addField("» User ID", member.id, true);
        if (data[0]) embed.addField("» Minecraft UUID", data[0].player_uuid, true);

        // Send the embed
        embed.send();

        // If user was verified, update their nickname immediately and give them a role.
        if (data[0]) {
            member.setNickname(data[0].player_name).catch(() => null);
            member.roles.add(member.guild.roles.find("name", "Verified")).catch(() => null);
        }
    }

    // Used to make dates easy to read
    humanize(date) {
        // Define months
        const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }
};
