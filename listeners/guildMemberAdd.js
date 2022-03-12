const Discord = require("discord.js");
const db = require ( "quick.db" );
const jsondb = require("../hyperdb");
const hyperdb = new jsondb("hyper.db");
const { Listener } = require('discord-akairo');
module.exports = class GuildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        });
    }
    async exec(member) {  
        try{
        
        const d = new Date();
        
        if(member.partial) member = await member.fetch();
        if(this.client.config.welcomeChannel == 'false' && member.user.bot) return;
        //let welcomeChannel = await this.client.channels.fetch(this.client.config.welcomeChannel).catch(err => console.log(err));
        //let welcomeChannel2 = member.client.channels.cache.get("938177185058025472");
        if(member.user.bot){ 
        //welcomeChannel.send(new Discord.MessageEmbed().setDescription(`${d.getDate('tr-TR', {timeZone: 'Turkey'})+'.'+(d.getMonth('tr-TR', {timeZone: 'Turkey'})+1)+'.'+(d.getYear('tr-TR', {timeZone: 'Turkey'})+1900)+', '+d.toLocaleTimeString('tr-TR', {timeZone: 'Turkey', hour12: false})} | <@${member.id}> (**${member.user.tag}**) OAuth aracılığıyla sunucuya katıldı.`).setColor('#a3ffe6')).catch(err => console.log(err));
        //welcomeChannel2.send(new Discord.MessageEmbed().setDescription(`${d.getDate('tr-TR', {timeZone: 'Turkey'})+'.'+(d.getMonth('tr-TR', {timeZone: 'Turkey'})+1)+'.'+(d.getYear('tr-TR', {timeZone: 'Turkey'})+1900)+', '+d.toLocaleTimeString('tr-TR', {timeZone: 'Turkey', hour12: false})} | <@${member.id}> (**${member.user.tag}**) OAuth aracılığıyla sunucuya katıldı.`).setColor('#a3ffe6')).catch(err => console.log(err));
        return;                  
        }
        const cachedInvites = this.client.guildInvites.get(member.guild.id);
        const newInvites = await member.guild.fetchInvites();
        if(member.guild.vanityURLCode) newInvites.set(member.guild.vanityURLCode, await member.guild.fetchVanityData());
        this.client.guildInvites.set(member.guild.id, newInvites);
        const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
      
        try{
        if(usedInvite.code === member.guild.vanityURLCode) {
            //welcomeChannel.send(new Discord.MessageEmbed().setDescription(`${d.getDate('tr-TR', {timeZone: 'Turkey'})+'.'+(d.getMonth('tr-TR', {timeZone: 'Turkey'})+1)+'.'+(d.getYear('tr-TR', {timeZone: 'Turkey'})+1900)+', '+d.toLocaleTimeString('tr-TR', {timeZone: 'Turkey', hour12: false})} | <@${member.id}> (**${member.user.tag}**) sunucunun özel URL'sini kullanarak sunucuya katıldı.`).setColor('#a3ffe6'));
            //welcomeChannel2.send(new Discord.MessageEmbed().setDescription(`${d.getDate('tr-TR', {timeZone: 'Turkey'})+'.'+(d.getMonth('tr-TR', {timeZone: 'Turkey'})+1)+'.'+(d.getYear('tr-TR', {timeZone: 'Turkey'})+1900)+', '+d.toLocaleTimeString('tr-TR', {timeZone: 'Turkey', hour12: false})} | <@${member.id}> (**${member.user.tag}**) sunucunun özel URL'sini kullanarak sunucuya katıldı.`).setColor('#a3ffe6'));
            await this.client.invites.findOrCreate({where: {discordUser: member.id, guildID: member.guild.id}, defaults: {inviter: 'VANITY', discordUser: member.id, guildID: member.guild.id}});
            return;
        };
        }finally{}
        if(!usedInvite){
        //welcomeChannel.send(new Discord.MessageEmbed().setDescription(`${d.getDate('tr-TR', {timeZone: 'Turkey'})+'.'+(d.getMonth('tr-TR', {timeZone: 'Turkey'})+1)+'.'+(d.getYear('tr-TR', {timeZone: 'Turkey'})+1900)+', '+d.toLocaleTimeString('tr-TR', {timeZone: 'Turkey', hour12: false})} | <@${member.id}> (**${member.user.tag}**) sunucuya katıldı ama nasıl katıldığını bilmiyorum. Belki de geçici bir davettir?`).setColor('#a3ffe6')).catch(err => console.log(err));
        //welcomeChannel2.send(new Discord.MessageEmbed().setDescription(`${d.getDate('tr-TR', {timeZone: 'Turkey'})+'.'+(d.getMonth('tr-TR', {timeZone: 'Turkey'})+1)+'.'+(d.getYear('tr-TR', {timeZone: 'Turkey'})+1900)+', '+d.toLocaleTimeString('tr-TR', {timeZone: 'Turkey', hour12: false})} | <@${member.id}> (**${member.user.tag}**) sunucuya katıldı ama nasıl katıldığını bilmiyorum. Belki de geçici bir davettir?`).setColor('#a3ffe6')).catch(err => console.log(err));
        return;
        }
        let foc = await this.client.invites.findOrCreate({where: {discordUser: usedInvite.inviter.id, guildID: member.guild.id}, defaults: {discordUser: usedInvite.inviter.id, invites: 0, guildID: member.guild.id}});
        await this.client.invites.findOrCreate({where: {discordUser: member.id, guildID: member.guild.id}, defaults: {inviter: usedInvite.inviter.id, discordUser: member.id, guildID: member.guild.id}})
        await foc[0].increment('invites');
        if(this.client.config.inviteRewards) {
            let inviter = await member.guild.members.fetch(usedInvite.inviter);
            this.client.config.rewards.forEach(reward => {
                if(foc[0].invites + 1 >= reward.invitesNeeded) {
                    inviter.roles.add(reward.roleID);
                } else {
                    return;
                };
            });
        };
        //if(!welcomeChannel) return;
        let toSend = this.client.config.welcomeMessage.replace(/\{member\}/g, member.user.tag).replace(/\{inviter\}/g, usedInvite.inviter.tag).replace(/\{invites\}/g, foc[0].invites + 1).replace(/\{code\}/g, usedInvite.code).replace(/\{mention\}/g, usedInvite.inviter.toString()).replace(/\{ID\}/g, member.id).replace(/\{inviterID\}/g, usedInvite.inviter.id);
        let idliwelcomemessage = "<@{ID}> (**{member}**) sunucuya katıldı. Davet eden: <@{inviterID}> (**{inviter}**) - discord.gg/{code}." //, discord.gg/{code}
        let toSendidli = idliwelcomemessage.replace(/\{member\}/g, member.user.tag).replace(/\{inviter\}/g, usedInvite.inviter.tag).replace(/\{invites\}/g, foc[0].invites + 1).replace(/\{code\}/g, usedInvite.code).replace(/\{mention\}/g, usedInvite.inviter.toString()).replace(/\{ID\}/g, member.id).replace(/\{inviterID\}/g, usedInvite.inviter.id);
        //welcomeChannel.send(new Discord.MessageEmbed().setDescription(`${d.getDate('tr-TR', {timeZone: 'Turkey'})+'.'+(d.getMonth('tr-TR', {timeZone: 'Turkey'})+1)+'.'+(d.getYear('tr-TR', {timeZone: 'Turkey'})+1900)+', '+d.toLocaleTimeString('tr-TR', {timeZone: 'Turkey', hour12: false})} | ${toSendidli}`).setColor('#a3ffe6')).catch(err => console.log(err));
        var davetsayisi = await db.fetch ( `1davetsayisi:${ usedInvite.inviter.id }` ) || 0;

        //welcomeChannel2.send(`${toSend} (**${davetsayisi+1}** davet)`).catch(err => console.log(err));

        db.add(`1davetsayisi:${ usedInvite.inviter.id }` , 1);

        db.add(`1gorevdavetsayisi:${ usedInvite.inviter.id }` , 1);

        hyperdb.add(`1davetsayisi:${ usedInvite.inviter.id }` , 1);

        hyperdb.add(`1gorevdavetsayisi:${ usedInvite.inviter.id }` , 1);
        
       
        if(usedInvite.maxUses && usedInvite.maxUses-usedInvite.uses<=2)
        {
            usedInvite.delete();
        }
            
  }          
 catch(err) {
  console.error(err);
}
       
    };
   
}