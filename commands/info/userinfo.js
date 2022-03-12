const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js');
module.exports = class UserInfoCommand extends Command {
    constructor() {
        super('userInfo', {
            //aliases: ['userinfo', 'whois', 'kullanıcıbilgisi', 'kullanicibilgisi', 'bilgi'],
            description: {
                content: 'Gets you info on the specified user.',
                usage: '<member>'
            },
            category: 'info',
            clientPermissions: ['EMBED_LINKS'],
            ratelimit: 2,
            args: [
                {
                    id: 'member',
                    type: 'custom-MEMBER',
                    prompt: {
                        start: 'Bilgilerine bakmak istediğin kişiyi etiketle.',
                        retry: 'Bu geçerli bir üye değil! Tekrar deneyin.'
                    }
                }
            ],
            userPermissions(message) {
                if(!message.member.roles.cache.has("855557176146657320") && !message.member.roles.cache.has("855557251380936734") && !message.member.roles.cache.has("874287678923894825") && !message.member.roles.cache.has("855557264606101524") && !message.member.hasPermission('ADMINISTRATOR')) return 'Manage Invites';
                return null;
            }
        });
    };
    async exec(message, {member}) {
        const { invites, config } = this.client;
        let foc = await invites.findOrCreate({where: {discordUser: member.id, guildID: message.guild.id}, defaults: {discordUser: member.id, invites: 0, guildID: message.guild.id}});   
        const embed = new MessageEmbed()
        .setColor(config.colors.main)
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .addFields([
            /*{
                name: "Davet eden",
                value: `${foc[0].inviter ? (await this.client.users.fetch(foc[0].inviter)).tag : "Bilinmiyor"}`,
                inline: true
            },
            {
                name: "\u200b",
                value: "\u200b",
                inline: true
            },
            {
                name: "Davet sayısı",
                value: `${foc[0].invites || "0"}`,
                inline: true
            },*/
            {
                name: "Hesabın oluşturulma tarihi",
                value: member.user.createdAt.toLocaleString('tr-TR', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}),
                //inline: true
            },
            //{
            //    name: "\u200b",
            //    value: "\u200b",
            //    inline: true
            //},
            {
                name: "Sunucuya girdiği tarih",
                value: member.joinedAt.toLocaleString('tr-TR', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}),
                //inline: true
            }
        ])
        .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
        .setFooter(`Komutu kullanan yetkili: ${message.member.displayName}` ,message.author.avatarURL({dynamic: true }))
        .setTimestamp();
        message.channel.send(embed);
    };
};
