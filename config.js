module.exports = {
    prefix: "!", // The prefix of the bot
    token: "",
    welcomeChannel: "855585995511955457", // The channel ID of where join and leave messages should be sent
    slashCommands: true, // Wether or not the bot should have slash commands
    colors: {
        main: [0, 110, 255],
        error: [231, 76, 60]
    },
    botstatus: {
        enabled: true, // Wether or not the bot should have a status
        status: "idle", // The status of the bot (dnd, online, idle, invisible)
        activity_type: "watching", // The type of the activity (watching, listening, playing, streaming)
        activity_text: "HypeR İstatistik", // The activity text
        activity_url: "" // The stream URL
    },
    inviteRewards: false, // Wether or not invite rewards should be enabled
    rewards: [
        {
            invitesNeeded: 5, // The amount of invites they should have
            roleID: "" // The role ID for the role they should get
        }, //Copy and paste this for each invite reward
        {
            invitesNeeded: 10,
            roleID: ""
        }
    ],
    welcomeMessage: "<@{ID}> (**{member}**) sunucuya katıldı. Davet eden: <@{inviterID}> (**{inviter}**).", //, discord.gg/{code} Use {inviter} for who invited the member, {member} for the member, {code} for the invite used, {mention} to mention the inviter, {ID} for the ID of the member, {inviterID} for the inviter's ID, and {invites} for the inviter's invites
    leaveMessage: "<@{ID}> (**{member}**) sunucudan ayrıldı. <@{inviterID}> (**{inviter}**) tarafından davet edilmişti.", // Use {inviter} for who invited the member, {member} for the member, {mention} to mention the inviter, {ID} for the ID of the member, {inviterID} for the inviter's ID, and {invites} for the inviter's invites

    //welcomeMessage: "<@{ID}> (**{member}**) Sunucuya katıldı. Davet eden: **{inviter}**. Kullanıcının toplam **{invites}** daveti oldu!", // Use {inviter} for who invited the member, {member} for the member, {code} for the invite used, {mention} to mention the inviter, {ID} for the ID of the member, {inviterID} for the inviter's ID, and {invites} for the inviter's invites
    //leaveMessage: "<@{ID}> (**{member}**) Ayrıldı. **{inviter}** tarafından davet edilmişti. Kullanıcının **{invites}** daveti kaldı!", // Use {inviter} for who invited the member, {member} for the member, {mention} to mention the inviter, {ID} for the ID of the member, {inviterID} for the inviter's ID, and {invites} for the inviter's invites
}
