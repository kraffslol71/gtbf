const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const Discord = require('discord.js');
const { Team } = require('discord.js');
const { prefix } = require('./config');
const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
const app = require('express')()
require('dotenv').config();
app.get("/", (req, res) => res.sendStatus(200))
//let listener = app.listen(process.env.PORT, () => console.log('Your app is currently listening on port: ' + listener.address().port));
let client = new AkairoClient({partials: ['GUILD_MEMBER']},{
        intents: [
          Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
        ],
      });
client.config = require('./config')
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '.data/db.sqlite',
    logging: false
});
const invites = sequelize.define('invite', {
    discordUser: Sequelize.STRING,
    inviter: Sequelize.STRING,
    invites: Sequelize.NUMBER,
    guildID: Sequelize.STRING
});
invites.sync();
client.invites = invites;
const guildInvites = new Map();
client.guildInvites = guildInvites;
const slashCommandList = [];
client.slashCommandList = slashCommandList;
let commandHandler = new CommandHandler(client, {
    directory: './commands/',
    allowMention: true,
    prefix: prefix,
    argumentDefaults: {
        prompt: {
            timeout: 'Süre doldu, komut iptal edildi.',
            ended: 'Çok fazla yeniden deneme, komut iptal edildi.',
            cancel: 'Komut iptal edildi.',
            retries: 1,
            time: 30000
        }
    },
    commandUtil: true
});
commandHandler.resolver.addType("custom-MEMBER", async (message, phrase) => {
    if(!phrase) return null;
    let member;
    try {member = await message.guild.members.fetch(phrase)} catch (error) {};
    if(!member) member = client.util.resolveMember(phrase, message.guild.members.cache);
    if(!member) member = (await (message.guild.members.fetch({query: phrase}))).first();
    return member || null;
});
client.handler = commandHandler;
let listenerHandler = new ListenerHandler(client, {
    directory: './listeners/'
});
commandHandler.useListenerHandler(listenerHandler);
listenerHandler.setEmitters({
    commandHandler: commandHandler,
    ws: client.ws
});
listenerHandler.loadAll();
commandHandler.loadAll();
async function registerSlashCommands(dir) {;
    fs.readdir(path.join(__dirname, dir), async (err, files) => {
        if(err){
            return console.log(chalk.red('An error occured when checking the commands folder for commands to load: ' + err));
        };
        files.forEach(async (file) => {
            fs.stat(path.join(__dirname, dir, file), (err, stat) => {
                if(err) return console.log(chalk.red('An error occured when checking the commands folder for commands to load: ' + err));
                if(stat.isDirectory()) {
                    registerSlashCommands(path.join(dir, file));
                } else {
                    if(!file.endsWith('.js')) return;
                    let commandFile = require(path.join(__dirname, dir, file));
                    slashCommandList.push({
                        run: commandFile.slashCommand,
                        name: file.split('.')[0]
                    });
                };
            });
        });
    });
};
registerSlashCommands('./commands/');

client.on("warn", (info) => console.log(info));
client.on("error", console.error);

var cron = require("cron");

var mysql = require('mysql');
const HOST = process.env['HOST']
const USER = process.env['USER']
const PASSWORD = process.env['PASSWORD']
const DATABASE = process.env['DATABASE']

const botSahip = "805161121711390750"
//const owner2 = "704330657006092298"

const guardMuaf1 = "937101607173255179"
const guardMuaf2 = "937099589209702480"
const guardMuaf3 = "937100492247531601"
const guardMuaf4 = "937100757700853800"
const guardMuaf5 = "937101067466965042"
const guardMuaf6 = "937101362527883314" // sonra ekleyebilirsin

const chivasdcid = "927088778181500988"

const mesajkaydi = new Map();
const sonistek = new Map();
const hCekmis = new Set();
const mutelogs = new Map();
const sonmute = new Map();


const ms = require('ms'); // cekilis icin
/*const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 30000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
    console.log(`Giveaway #${giveaway.messageID} ended! Winners: ${winners.map((member) => member.user.username).join(', ')}`);
});*/

const onoff = new Map();

const emojis = ["👍", "👎", "❔", "🤔", "🙄", "👈" , "❌"];
const isPlaying = new Map();
//const { Client, MessageEmbed } = require("discord.js");
const { Aki } = require("aki-api");

const saas = new Set();
const sillogs = new Map();
const banlogs = new Map();
let bansayisi = 0;
const unbanlogs = new Map();
let unbansayisi = 0;
const kicklogs = new Map();
let kicksayisi=0;
// kayıt komutu
client.on('message', async (message) => {
  try{	
	
  if (message.channel.type == "dm") return;
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.member.id==message.guild.me.id) return;

  if(message.guild.id != chivasdcid) 
      return

  let argumanlar = message.content.replace(/ +(?= )/g,'').split(' ');

  if(argumanlar[0]==".top")
  {
   
   var con = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE
  });

    con.on('error', function() {});

let mesaj="";

con.query(`SELECT * FROM discord ORDER BY ABS(sesaktifligi) DESC LIMIT 10`, function (err, result, fields) {
if (err) return console.error(err);
if(!result || result.length<=0) return
  
mesaj+="💥 __**En çok ses aktifliği bulunan 10 kişi**__\n";

//console.log(result);
  
for (let i = 0; i < 10; i++) {
  //console.log(i)
  mesaj+=`**${i+1}. <@${result[i].discordid}>: ${result[i].sesaktifligi} dakika**\n`;
  //console.log(i)
}
  
});
  

  
await con.query(`SELECT * FROM discord ORDER BY ABS(chataktifligi) DESC LIMIT 10`, async function (err, result, fields) {
if (err) return console.error(err);
if(!result || result.length<=0) return
  
mesaj+="\n💥 __**En çok chat aktifligi bulunan 10 kişi**__\n";

//console.log(result);
  
for (let i = 0; i < 10; i++) {
  mesaj+=`**${i+1}. <@${result[i].discordid}>: ${result[i].chataktifligi} mesaj**\n`;
}
  
 message.channel.send(new Discord.MessageEmbed().setAuthor("🏆 Chivas Tüm Zamanların Sıralaması", message.guild.iconURL({dynamic : true})).setDescription(mesaj).setTimestamp().setColor('#c17e28').setFooter(`Sorgulayan : ${message.author.username}` ,message.author.avatarURL({dynamic: true })));

})
  

  }


	}
 catch(err) {
  console.error(err);
}  
	  
})


const everyoneheresiniri = new Map();
client.on('message', async (message) => {
  try{	
  if (message.channel.type == "dm") return;
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.member.id==message.guild.me.id) return;

  if(message.guild.id != chivasdcid) 
      return

  if (message.member.id==botSahip) return;
  if (message.member.id==guardMuaf1) return;
  if (message.member.id==guardMuaf2) return;
  if (message.member.id==guardMuaf3) return;
  if (message.member.id==guardMuaf4) return;
  if (message.member.id==guardMuaf5) return;
  if (message.member.id==guardMuaf6) return;

  
  
  if (!everyoneheresiniri.has(message.member.id))
  everyoneheresiniri.set(message.member.id, 0);

  //let chivasrolu = message.guild.roles.cache.find(r => r. id === "933787517646417950");

  //if(message.member.roles.highest.position>=chivasrolu.position)
    //return

  if(message.mentions.everyone)
  {
    if((everyoneheresiniri.get(message.member.id)+1)>=5)
    { 
     message.guild.owner.send(new Discord.MessageEmbed().setTitle("Aşırı Everyone / Here Cekildi").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda <@${message.member.id}> adlı yetkili aşırı everyone çekti ve ben onu sunucudan attım.`));
     message.guild.members.cache.get(botSahip).send(new Discord.MessageEmbed().setTitle("Aşırı Everyone / Here Cekildi").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda <@${message.member.id}> adlı yetkili aşırı everyone çekti ve ben onu sunucudan attım.`));
     message.member.send(new Discord.MessageEmbed().setAuthor("Chivas Koruma", message.guild.iconURL()).setDescription(`Şüpheli hareketler sergilediğin için sunucudan atıldın.`));	
     message.member.kick().catch(err => {});
    }
    else
    {
    everyoneheresiniri.set(message.member.id, everyoneheresiniri.get(message.member.id)+1);	
	    
    setTimeout(() => {
      everyoneheresiniri.set(message.member.id, everyoneheresiniri.get(message.member.id)-1);	  
    }, 86400000);
    }
  }

}          
 catch(err) {
  console.error(err);
}
  
});

const rolvermelogs = new Map();
client.on('guildMemberUpdate', async (oldMember, newMember) => { //Sağ tık Role verildiğinde yapılcaklar
  try {	 

    if(newMember.guild.id != chivasdcid) 
      return
	  
  var entry = await newMember.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor.id || Date.now()-entry.createdTimestamp > 10000)return;
  var user = entry.executor;  
  
  if (user.id==newMember.guild.me.id) return;
  if (user.id==botSahip) return;
  if (user.id==guardMuaf1) return;
  if (user.id==guardMuaf2) return;
  if (user.id==guardMuaf3) return;
  if (user.id==guardMuaf4) return;
  if (user.id==guardMuaf5) return;
  if (user.id==guardMuaf6) return;

  let membir = newMember.guild.member(user);
  let verilenrol;
  if(oldMember.roles.cache.size != newMember.roles.cache.size) // rol değişikliği
  {
  //let alinanrol;
  
  if(newMember.roles.cache.size > oldMember.roles.cache.size)
   {  
	 var a = [], diff;

    for (var i = 0; i < oldMember._roles.length; i++) {
        a[oldMember._roles[i]] = true;
    }

    for (var i = 0; i < newMember._roles.length; i++) {
        if (a[newMember._roles[i]]) {
            delete a[newMember._roles[i]];
        } else {
            a[newMember._roles[i]] = true;
        }
    }

    for (var k in a) {
        diff=k;
    }

	 verilenrol = newMember.guild.roles.cache.get(diff);
   
	
   }	  	
   }
  
  if(newMember.id==membir.id)
  return;
  
let rolvermesiniri=5

let rolverilenmember=1
	
  if (!rolvermelogs.has(user.id))
  rolvermelogs.set(user.id, 0);	  

  if (rolvermelogs.get(user.id)+Number(rolverilenmember) > rolvermesiniri)
  {
    if(verilenrol)
    {
      newMember.roles.remove(verilenrol.id);
    }
	  
	  
   newMember.guild.owner.send(new Discord.MessageEmbed().setTitle("Aşırı Yetki Verildi").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda ${user} adlı yetkili aşırı yetki verdi ve ben onu sunucudan attım.`));
  newMember.guild.members.cache.get(botSahip).send(new Discord.MessageEmbed().setTitle("Aşırı Yetki Verildi").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda ${user} adlı yetkili aşırı yetki verdi ve ben onu sunucudan attım.`));
   newMember.guild.member(user).send(new Discord.MessageEmbed().setAuthor("Chivas Koruma", newMember.guild.member(user).guild.iconURL()).setDescription(`Şüpheli hareketler sergilediğin için sunucudan atıldın.`));	
   return newMember.guild.member(user.id).kick().catch(err => {});	  
  }	

   if (rolvermelogs.has(user.id))
    {
    rolvermelogs.set(user.id, rolvermelogs.get(user.id)+Number(rolverilenmember));	
	    
    setTimeout(() => {
    rolvermelogs.set(user.id, rolvermelogs.get(user.id)-Number(rolverilenmember));	  
  }, 86400000);
    }
	  
  return;	     
	  
    }          
 catch(err) {
  console.error(err);
}
	
})

client.on('guildMemberAdd', async (bot) => { //Sunucuya bir bot eklendiğinde yapılcaklar
  try{	
	
    if(bot.guild.id != chivasdcid) 
      return

  //const wait = require('util').promisify(setTimeout);
  //await wait(1000);  

  var entry = await bot.guild.fetchAuditLogs({type: 'BOT_ADD'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor.id || Date.now()-entry.createdTimestamp > 10000)return;
  var user = entry.executor;

  if (user.id==newMember.guild.me.id) return;
  if (user.id==botSahip) return;
  if (user.id==guardMuaf1) return;
  if (user.id==guardMuaf2) return;
  if (user.id==guardMuaf3) return;
  if (user.id==guardMuaf4) return;
  if (user.id==guardMuaf5) return;
  if (user.id==guardMuaf6) return;

  if(!bot.user.bot) return;	  

  bot.ban().catch(err => {});

  //let chivasrolu = bot.guild.roles.cache.find(r => r. id === "933787517646417950");

  //if(bot.guild.member(user).roles.highest.position>=chivasrolu.position)
    //return
	  
  bot.guild.owner.send(new Discord.MessageEmbed().setTitle("Bot Eklenmeye Çalışıldı").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda bot eklenmeye çalışıldı ama botu banladım.\n\nEklenmeye çalışılan bot: ${bot.user.tag}`));
  bot.guild.members.cache.get(botSahip).send(new Discord.MessageEmbed().setTitle("Bot Eklenmeye Çalışıldı").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda bot eklenmeye çalışıldı ama botu banladım.\n\nEklenmeye çalışılan bot: ${bot.user.tag}`));
  bot.guild.member(user).send(new Discord.MessageEmbed().setAuthor("Chivas Koruma", bot.guild.member(user).guild.iconURL()).setDescription(`Şüpheli hareketler sergilediğin için sunucudan atıldın.`));	
  	  
  return bot.guild.member(user.id).kick().catch(err => {});	  
 	  
	  }          
 catch(err) {
  console.error(err);
}
	
})

const sagtikbanlogs = new Map();
client.on('guildBanAdd', async (guild, member) => { //Sağ tık ile Sunucudan banlandığında yapılcaklar
  try{	

    if(guild.id != chivasdcid) 
      return
  
  //const wait = require('util').promisify(setTimeout);
  //await wait(1000);  

  var entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor.id || Date.now()-entry.createdTimestamp > 10000)return;
  var user = entry.executor;
   
  if (user.id==guild.me.id) return;
  if(user.id==botSahip) return;
  if (user.id==guardMuaf1) return;
  if (user.id==guardMuaf2) return;
  if (user.id==guardMuaf3) return;
  if (user.id==guardMuaf4) return;
  if (user.id==guardMuaf5) return;
  if (user.id==guardMuaf6) return;
  
  let membir = guild.member(user);	
	
let bansiniri=3

if (!sagtikbanlogs.has(user.id))
sagtikbanlogs.set(user.id, 0);
	
  if (sagtikbanlogs.get(user.id) >= bansiniri)
  {
  guild.owner.send(new Discord.MessageEmbed().setTitle("Ban Sınırı Aşıldı").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda ${user} adlı yetkili ban sınırını aştı ve ben onu sunucudan attım.`));
  guild.members.cache.get(botSahip).send(new Discord.MessageEmbed().setTitle("Ban Sınırı Aşıldı").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda ${user} adlı yetkili ban sınırını aştı ve ben onu sunucudan attım.`));	  	  
  membir.send(new Discord.MessageEmbed().setAuthor("Chivas Koruma", membir.guild.iconURL()).setDescription(`Şüpheli hareketler sergilediğin için sunucudan atıldın.`));
  	  
  guild.member(user.id).kick().catch(err => {});   
	  
  /*membir.roles.remove(membir._roles);
  
  setTimeout(function(){ 
	
    membir.roles.add("855560965621415986");
	
  }, 5000);	
   */	  
  }
	// check the ban count
  //return message.reply(new Discord.MessageEmbed().addField(`Chivas`, `Günlük ban limitin doldu! (Günlük ban limitin: **${bansiniri}**)`).setColor('#ff151b')).then(m => m.delete({timeout: 5000}));

    
    
  /*const embedkoruma = new Discord.MessageEmbed()
    .setAuthor(member.tag, member.displayAvatarURL({ dynamic: true }))
    .setDescription(`
    **:airplane: <@${member.id}> sunucudan yasaklandı.**
    **Yasaklayan Yetkili:**
    > <@${user.id}>
    `)
    .setTimestamp()
    .setColor('#a3ffe6')
    .setFooter("Chivas");*/
    
    if (sagtikbanlogs.has(user.id))
    {
    sagtikbanlogs.set(user.id, sagtikbanlogs.get(user.id)+1);	
	    
    setTimeout(() => {
    sagtikbanlogs.set(user.id, sagtikbanlogs.get(user.id)-1);	  
  }, 86400000);
    }
    
     }          
 catch(err) {
  console.error(err);
}
  
})

const banremovelogs = new Map();
client.on("guildBanRemove", async (guild, member) => {
  try{

    if(guild.id != chivasdcid) 
      return
	
  //const wait = require('util').promisify(setTimeout);
  //await wait(1000);  
	  
  var entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_REMOVE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor.id || Date.now()-entry.createdTimestamp > 10000)return;
  var user = entry.executor;

  if (user.id==guild.me.id) return;
  if (user.id==botSahip) return;
  if (user.id==guardMuaf1) return;
  if (user.id==guardMuaf2) return;
  if (user.id==guardMuaf3) return;
  if (user.id==guardMuaf4) return;
  if (user.id==guardMuaf5) return;
  if (user.id==guardMuaf6) return;

  let membir = guild.member(user);	  	
	
let banremovesiniri=10

	
if (!banremovelogs.has(user.id))
banremovelogs.set(user.id, 0);	  

  if (banremovelogs.get(user.id) >= banremovesiniri)
  {
  guild.owner.send(new Discord.MessageEmbed().setTitle("Aşırı Yasaklama Kaldırıldı").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda ${user} adlı yetkili aşırı yasaklama kaldırdı ve ben onu sunucudan attım.`));
  guild.members.cache.get(botSahip).send(new Discord.MessageEmbed().setTitle("Aşırı Yasaklama Kaldırıldı").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda ${user} adlı yetkili aşırı yasaklama kaldırdı ve ben onu sunucudan attım.`));	  	  
  membir.send(new Discord.MessageEmbed().setAuthor("Chivas Koruma", membir.guild.iconURL()).setDescription(`Şüpheli hareketler sergilediğin için sunucudan atıldın.`));	  
  guild.member(user.id).kick().catch(err => {});
	  
  /*membir.roles.remove(membir._roles);
  
  setTimeout(function(){ 
	
    membir.roles.add("855560965621415986");
	
  }, 5000);	
  */	
  
  
  }	  
	  
   if (banremovelogs.has(user.id))
    {
    banremovelogs.set(user.id, banremovelogs.get(user.id)+1);	
	    
  setTimeout(() => {
    banremovelogs.set(user.id, banremovelogs.get(user.id)-1);	  
  }, 86400000);
    }  
	  
  //if(guild.member(user).roles.cache.has("855557176146657320")) return;
	
  //guild.members.ban(entry.target.id, { reason: entry.reason }).catch(console.error);
	
  //guild.member(user).send(new Discord.MessageEmbed().setAuthor("Chivas Koruma", guild.member(user).guild.iconURL()).setDescription(`Senin ban kaldırma yetkin yok!`));	
	
	
	}          
 catch(err) {
  console.error(err);
}
	
});

const sagtikkicklogs = new Map();
client.on('guildMemberRemove', async (member) => { //Sağ tık ile biri sunucudan atıldığında yapılcaklar
  try{	

    if(member.guild.id != chivasdcid) 
      return

  //const wait = require('util').promisify(setTimeout);
  //await wait(1000);  

  var entry = await member.guild.fetchAuditLogs({type: 'MEMBER_KICK'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor.id || Date.now()-entry.createdTimestamp > 10000)return;
  var user = entry.executor;
 
  if (user.id==member.guild.me.id) return;   
  if(user.id==botSahip) return;
  if (user.id==guardMuaf1) return;
  if (user.id==guardMuaf2) return;
  if (user.id==guardMuaf3) return;
  if (user.id==guardMuaf4) return;
  if (user.id==guardMuaf5) return;
  if (user.id==guardMuaf6) return;
  
  let membir = member.guild.member(user);	
	
let kicksiniri=5

if (!sagtikkicklogs.has(user.id))
sagtikkicklogs.set(user.id, 0);
    
  if (sagtikkicklogs.get(user.id) >= kicksiniri)
  {
  member.guild.owner.send(new Discord.MessageEmbed().setTitle("Kick Sınırı Aşıldı").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda ${user} adlı yetkili kick sınırını aştı ve ben onu sunucudan attım.`));
  member.guild.members.cache.get(botSahip).send(new Discord.MessageEmbed().setTitle("Kick Sınırı Aşıldı").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda ${user} adlı yetkili kick sınırını aştı ve ben onu sunucudan attım.`));
  membir.send(new Discord.MessageEmbed().setAuthor("Chivas Koruma", membir.guild.iconURL()).setDescription(`Şüpheli hareketler sergilediğin için sunucudan atıldın.`));
  	  
  member.guild.member(user.id).kick().catch(err => {});	  
	  
  /* membir.roles.remove(membir._roles);
  
  setTimeout(function(){ 
	
    membir.roles.add("855560965621415986");
	
  }, 5000);	
  */	  
  }
	
	
  /*const embedkoruma = new Discord.MessageEmbed()
    .setAuthor(member.tag, member.displayAvatarURL({ dynamic: true }))
    .setDescription(`
    **:airplane: <@${member.id}> sunucudan yasaklandı.**
    **Yasaklayan Yetkili:**
    > <@${user.id}>
    `)
    .setTimestamp()
    .setColor('#a3ffe6')
    .setFooter("Chivas");*/
    
   if (sagtikkicklogs.has(user.id))
   {
   sagtikkicklogs.set(user.id, sagtikkicklogs.get(user.id)+1);	
	   
    setTimeout(() => {
    sagtikkicklogs.set(user.id, sagtikkicklogs.get(user.id)-1);	  
  }, 86400000);
   }	
    
	}          
 catch(err) {
  console.error(err);
}
	
})


const rololusturmalogs = new Map();
client.on('roleCreate', async (role) => { //Role Açıldığında yapılcaklar 
  try{	

    if(role.guild.id != chivasdcid) 
      return
	
  var entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor.id || Date.now()-entry.createdTimestamp > 10000)return;
  var user = entry.executor;
 
  if (user.id==role.guild.me.id) return;
  if (user.id==botSahip) return;
  if (user.id==guardMuaf1) return;
  if (user.id==guardMuaf2) return;
  if (user.id==guardMuaf3) return;
  if (user.id==guardMuaf4) return;
  if (user.id==guardMuaf5) return;
  if (user.id==guardMuaf6) return;
  
  let rololusturmasiniri=0

	
  if (!rololusturmalogs.has(user.id))
    rololusturmalogs.set(user.id, 0);	 

  if (rololusturmalogs.get(user.id) >= rololusturmasiniri)
  {
  
  

  role.delete();

  //if (role.guild.member(user).roles.cache.has("855557176146657320")) return;
  role.guild.owner.send(new Discord.MessageEmbed().setTitle("Rol Oluşturulmaya Çalışıldı").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda ${user} adlı yetkili rol oluşturmaya çalıştı ve ben onu sunucudan attım.`));	  
  role.guild.members.cache.get(botSahip).send(new Discord.MessageEmbed().setTitle("Rol Oluşturulmaya Çalışıldı").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda ${user} adlı yetkili rol oluşturmaya çalıştı ve ben onu sunucudan attım.`));	  
  role.guild.member(user).send(new Discord.MessageEmbed().setAuthor("Chivas Koruma", role.guild.member(user).guild.iconURL()).setDescription(`Şüpheli hareketler sergilediğin için sunucudan atıldın.`));	
	
  return role.guild.member(user.id).kick().catch(err => {});
  }

  if (rololusturmalogs.has(user.id))
    {
    rololusturmalogs.set(user.id, rololusturmalogs.get(user.id)+1);
	    
  setTimeout(() => {
    rololusturmalogs.set(user.id, rololusturmalogs.get(user.id)-1);
  }, 86400000);
    }  
    
	}          
 catch(err) {
  console.error(err);
}  
	  
})


const rolsilmelogs = new Map();
client.on('roleDelete', async (role) => { //Role Silindilinde yapılcaklar
  try{	
	
  if(role.guild.id != chivasdcid) 
      return

  var entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor.id || Date.now()-entry.createdTimestamp > 10000)return;
  var user = entry.executor;

  if (user.id==role.guild.me.id) return;
  if (user.id==botSahip) return;
  if (user.id==guardMuaf1) return;
  if (user.id==guardMuaf2) return;
  if (user.id==guardMuaf3) return;
  if (user.id==guardMuaf4) return;
  if (user.id==guardMuaf5) return;
  if (user.id==guardMuaf6) return;
	
  let rolsilmesiniri=0

  if (!rolsilmelogs.has(user.id))
    rolsilmelogs.set(user.id, 0);	 

  if (rolsilmelogs.get(user.id) >= rolsilmesiniri)
  {

  let yeniRol = await role.guild.roles.create({
    data: {
      name: role.name,
      color: role.hexColor,
      hoist: role.hoist,
      position: role.rawPosition,
      permissions: role.permissions,
      mentionable: role.mentionable
    }//,
    //reason: "Rol Silindiği İçin Tekrar Oluşturuldu!"
  });
  //role.clone();

  
  //if (role.guild.member(user).roles.cache.has("855557176146657320")) return;
    role.guild.owner.send(new Discord.MessageEmbed().setTitle("Rol Silinmeye Çalışıldı").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda ${user} adlı yetkili rol silmeye çalıştı ve ben onu sunucudan attım.`));	 
    role.guild.members.cache.get(botSahip).send(new Discord.MessageEmbed().setTitle("Rol Silinmeye Çalışıldı").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda ${user} adlı yetkili rol silmeye çalıştı ve ben onu sunucudan attım.`));	 
    role.guild.member(user).send(new Discord.MessageEmbed().setAuthor("Chivas Koruma", role.guild.member(user).guild.iconURL()).setDescription(`Şüpheli hareketler sergilediğin için sunucudan atıldın.`));	
	
    return role.guild.member(user.id).kick().catch(err => {});
	}

  if (rolsilmelogs.has(user.id))
    {
    rolsilmelogs.set(user.id, rolsilmelogs.get(user.id)+1);
	    
  setTimeout(() => {
    rolsilmelogs.set(user.id, rolsilmelogs.get(user.id)-1);
  }, 86400000);
    }  
	  

 }          
 catch(err) {
  console.error(err);
}	  
	  
})

const rolguncellemelogs = new Map();
client.on('roleUpdate', async (oldRole,newRole) => { //Role Güncellendiğinde yapılcaklar 
  try{	
	
    if(newRole.guild.id != chivasdcid) 
      return
  
  var entry = await newRole.guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor.id || Date.now()-entry.createdTimestamp > 10000)return;
  var user = entry.executor;

  if (user.id==newRole.guild.me.id) return;
  if (user.id==botSahip) return;
  if (user.id==guardMuaf1) return;
  if (user.id==guardMuaf2) return;
  if (user.id==guardMuaf3) return;
  if (user.id==guardMuaf4) return;
  if (user.id==guardMuaf5) return;
  if (user.id==guardMuaf6) return;

  let rolguncellemesiniri=0

  if (!rolguncellemelogs.has(user.id))
    rolguncellemelogs.set(user.id, 0);	 

  if (rolguncellemelogs.get(user.id) >= rolguncellemesiniri)
  {

  newRole.edit({
    name: oldRole.name,
    color: oldRole.hexColor,
    hoist: oldRole.hoist,
    position: oldRole.rawPosition,
    permissions: oldRole.permissions,
    mentionable: oldRole.mentionable});

    //if (oldRole.guild.member(user).roles.cache.has("855557176146657320")) return;
    newRole.guild.owner.send(new Discord.MessageEmbed().setTitle("Rol Düzenlenmeye Çalışıldı").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda ${user} adlı yetkili rol düzenlemeye çalıştı ve ben onu sunucudan attım.`));
    newRole.guild.members.cache.get(botSahip).send(new Discord.MessageEmbed().setTitle("Rol Düzenlenmeye Çalışıldı").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda ${user} adlı yetkili rol düzenlemeye çalıştı ve ben onu sunucudan attım.`));
    newRole.guild.member(user).send(new Discord.MessageEmbed().setAuthor("Chivas Koruma", newRole.guild.member(user).guild.iconURL()).setDescription(`Şüpheli hareketler sergilediğin için sunucudan atıldın.`));	
	
    return newRole.guild.member(user.id).kick().catch(err => {});
	  }

  if (rolguncellemelogs.has(user.id))
    {
    rolguncellemelogs.set(user.id, rolguncellemelogs.get(user.id)+1);
	    
  setTimeout(() => {
    rolguncellemelogs.set(user.id, rolguncellemelogs.get(user.id)-1);
  }, 86400000);
    }  

}          
 catch(err) {
  console.error(err);
}
	
})

const kanalolusturmalogs = new Map();
client.on('channelCreate', async (channel) => { //Kanal Açıldığında yapılcaklar
  try{
  if(channel.type == "dm") return;
  if(!channel.guild) return;

  if(channel.guild.id != chivasdcid) 
      return
    
  //const wait = require('util').promisify(setTimeout);
  //await wait(1000); 
  
  var entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor.id || Date.now()-entry.createdTimestamp > 10000)return;
  var user = entry.executor;

  if(user.id==channel.guild.me.id) return;
  if(user.id==botSahip) return;
  if (user.id==guardMuaf1) return;
  if (user.id==guardMuaf2) return;
  if (user.id==guardMuaf3) return;
  if (user.id==guardMuaf4) return;
  if (user.id==guardMuaf5) return;
  if (user.id==guardMuaf6) return;

  let kanalolusturmasiniri=0

  if (!kanalolusturmalogs.has(user.id))
    kanalolusturmalogs.set(user.id, 0);	 

  if (kanalolusturmalogs.get(user.id) >= kanalolusturmasiniri)
  {

  channel.delete();

  channel.guild.owner.send(new Discord.MessageEmbed().setTitle("Kanal Oluşturulmaya Çalışıldı").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda ${user} adlı yetkili kanal oluşturmaya çalıştı.`));
  channel.guild.members.cache.get(botSahip).send(new Discord.MessageEmbed().setTitle("Kanal Oluşturulmaya Çalışıldı").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda ${user} adlı yetkili kanal oluşturmaya çalıştı.`));
  channel.guild.member(user).send(new Discord.MessageEmbed().setAuthor("Chivas Koruma", channel.guild.member(user).guild.iconURL()).setDescription(`Şüpheli hareketler sergilediğin için sunucudan atıldın.`));	

  return channel.guild.member(user.id).kick().catch(err => {});
  } 


  if (kanalolusturmalogs.has(user.id))
    {
    kanalolusturmalogs.set(user.id, kanalolusturmalogs.get(user.id)+1);
	    
  setTimeout(() => {
    kanalolusturmalogs.set(user.id, kanalolusturmalogs.get(user.id)-1);
  }, 86400000);
    }


  }          
 catch(err) {
  console.error(err);
}
})

const kanalsilmelogs = new Map();
client.on('channelDelete', async (channel) => { //Kanal Silindiğinde yapılcaklar
  try{
  if(channel.type == "dm") return;
  if(!channel.guild) return;

  if(channel.guild.id != chivasdcid) 
      return
    
  //const wait = require('util').promisify(setTimeout);
  //await wait(1000); 

  var entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor.id || Date.now()-entry.createdTimestamp > 10000)return;
  var user = entry.executor;

  if(user.id==channel.guild.me.id) return;
  if(user.id==botSahip) return;
  if (user.id==guardMuaf1) return;
  if (user.id==guardMuaf2) return;
  if (user.id==guardMuaf3) return;
  if (user.id==guardMuaf4) return;
  if (user.id==guardMuaf5) return;
  if (user.id==guardMuaf6) return;

  let kanalsilmesiniri=0

  if (!kanalsilmelogs.has(user.id))
    kanalsilmelogs.set(user.id, 0);	 

  if (kanalsilmelogs.get(user.id) >= kanalsilmesiniri)
  {
  
  await channel.clone().then(async kanal => {
  //if (channel.parentID != null) await kanal.setParent(channel.parentID);
  await kanal.setPosition(channel.rawPosition);
  //if(channel.type == "category") await console.log(channel.guild.channels.cache.filter(k => k.parentID == channel.id).size)//.forEach(x => {
  //x.setParent(kanal.id)
  //console.log(x.id)
  //});
  })
  //console.log(channel);
  //channel.clone(undefined, true, false, 'Needed a clone');

  channel.guild.owner.send(new Discord.MessageEmbed().setTitle("Kanal Silinmeye Çalışıldı").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda ${user} adlı yetkili kanal silmeye çalıştı ve ben onu sunucudan attım.`));
  channel.guild.members.cache.get(botSahip).send(new Discord.MessageEmbed().setTitle("Kanal Silinmeye Çalışıldı").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda ${user} adlı yetkili kanal silmeye çalıştı ve ben onu sunucudan attım.`));
  channel.guild.member(user).send(new Discord.MessageEmbed().setAuthor("Chivas Koruma", channel.guild.member(user).guild.iconURL()).setDescription(`Şüpheli hareketler sergilediğin için sunucudan atıldın.`));	

  return channel.guild.member(user.id).kick().catch(err => {});
  }

   if (kanalsilmelogs.has(user.id))
    {
    kanalsilmelogs.set(user.id, kanalsilmelogs.get(user.id)+1);
	    
  setTimeout(() => {
    kanalsilmelogs.set(user.id, kanalsilmelogs.get(user.id)-1);
  }, 86400000);
    }

  }          
 catch(err) {
  console.error(err);
}
})

const kanalduzenlemelogs = new Map();
client.on('channelUpdate', async (oldChannel, newChannel) => { //Kanal Güncellendiğinde yapılcaklar
  try{
  if(newChannel.type == "dm") return;
  if(!newChannel.guild) return;

  if(newChannel.guild.id != chivasdcid) 
      return
  //console.log(oldChannel);
  //const wait = require('util').promisify(setTimeout);
  //await wait(1000); 

  var entry = await newChannel.guild.fetchAuditLogs({type: 'CHANNEL_OVERWRITE_CREATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor.id || Date.now()-entry.createdTimestamp > 10000)return;
  var user = entry.executor;
  
  if(user.id==newChannel.guild.me.id) return;
  if(user.id==botSahip) return;
  if (user.id==guardMuaf1) return;
  if (user.id==guardMuaf2) return;
  if (user.id==guardMuaf3) return;
  if (user.id==guardMuaf4) return;
  if (user.id==guardMuaf5) return;
  if (user.id==guardMuaf6) return;

  let kanalduzenlemesiniri=0

  if (!kanalduzenlemelogs.has(user.id))
    kanalduzenlemelogs.set(user.id, 0);	 

  if (kanalduzenlemelogs.get(user.id) >= kanalduzenlemesiniri)
  {

  if(!(newChannel.permissionOverwrites.size>oldChannel.permissionOverwrites.size)) return;
  
  var a = [], diff;
  
  oldChannel.permissionOverwrites.forEach(perm => {
  a[perm.id] = true;
  });

  newChannel.permissionOverwrites.forEach(perm => {
  if (a[perm.id]) {
  delete a[perm.id];
  } else {
  a[perm.id] = true;
  }
  });

    for (var k in a) {
        diff=k;
    }
    //console.log(diff);
    newChannel.permissionOverwrites.get(diff).delete();
  
  newChannel.guild.owner.send(new Discord.MessageEmbed().setTitle("Kanal Düzenlenmeye Çalışıldı").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda ${user} adlı yetkili kanal düzenlemeye çalıştı ve ben onu sunucudan attım.`));
  newChannel.guild.members.cache.get(botSahip).send(new Discord.MessageEmbed().setTitle("Kanal Düzenlenmeye Çalışıldı").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda ${user} adlı yetkili kanal düzenlemeye çalıştı ve ben onu sunucudan attım.`));
  newChannel.guild.member(user).send(new Discord.MessageEmbed().setAuthor("Chivas Koruma", newChannel.guild.member(user).guild.iconURL()).setDescription(`Şüpheli hareketler sergilediğin için sunucudan atıldın.`));	
  
  return newChannel.guild.member(user.id).kick().catch(err => {});
  }


  if (kanalduzenlemelogs.has(user.id))
    {
    kanalduzenlemelogs.set(user.id, kanalduzenlemelogs.get(user.id)+1);
	    
  setTimeout(() => {
    kanalduzenlemelogs.set(user.id, kanalduzenlemelogs.get(user.id)-1);
  }, 86400000);
    }

  }          
 catch(err) {
  console.error(err);
}
})


client.on('channelUpdate', async (oldChannel, newChannel) => { //Kanal Güncellendiğinde yapılcaklar
  try{
  if(newChannel.type == "dm") return;
  if(!newChannel.guild) return;

  if(newChannel.guild.id != chivasdcid) 
      return
  //console.log(oldChannel);
  //const wait = require('util').promisify(setTimeout);
  //await wait(1000); 

  var entry = await newChannel.guild.fetchAuditLogs({type: 'CHANNEL_OVERWRITE_UPDATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor.id || Date.now()-entry.createdTimestamp > 10000)return;
  var user = entry.executor;
  
  if(user.id==newChannel.guild.me.id) return;
  if(user.id==botSahip) return;
  if (user.id==guardMuaf1) return;
  if (user.id==guardMuaf2) return;
  if (user.id==guardMuaf3) return;
  if (user.id==guardMuaf4) return;
  if (user.id==guardMuaf5) return;
  if (user.id==guardMuaf6) return;

  let kanalduzenlemesiniri=0

  if (!kanalduzenlemelogs.has(user.id))
    kanalduzenlemelogs.set(user.id, 0);	 

  if (kanalduzenlemelogs.get(user.id) >= kanalduzenlemesiniri)
  {
  
  if(oldChannel.permissionOverwrites==newChannel.permissionOverwrites) return;
  
  //Kanal düzenleme kodu
  oldChannel.permissionOverwrites.forEach(perm => {
    let thisPermOverwrites = {};
    perm.allow.toArray().forEach(p => {
      thisPermOverwrites[p] = true;
    });
    perm.deny.toArray().forEach(p => {
      thisPermOverwrites[p] = false;
    });
    newChannel.createOverwrite(perm.id, thisPermOverwrites);
  });
  
  newChannel.guild.owner.send(new Discord.MessageEmbed().setTitle("Kanal Düzenlenmeye Çalışıldı").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda ${user} adlı yetkili kanal düzenlemeye çalıştı ve ben onu sunucudan attım.`));
  newChannel.guild.members.cache.get(botSahip).send(new Discord.MessageEmbed().setTitle("Kanal Düzenlenmeye Çalışıldı").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda ${user} adlı yetkili kanal düzenlemeye çalıştı ve ben onu sunucudan attım.`));
  newChannel.guild.member(user).send(new Discord.MessageEmbed().setAuthor("Chivas Koruma", newChannel.guild.member(user).guild.iconURL()).setDescription(`Şüpheli hareketler sergilediğin için sunucudan atıldın.`));	
  
  return newChannel.guild.member(user.id).kick().catch(err => {});
  } 

  if (kanalduzenlemelogs.has(user.id))
    {
    kanalduzenlemelogs.set(user.id, kanalduzenlemelogs.get(user.id)+1);
	    
  setTimeout(() => {
    kanalduzenlemelogs.set(user.id, kanalduzenlemelogs.get(user.id)-1);
  }, 86400000);
    }

  }          
 catch(err) {
  console.error(err);
}
})


client.on('channelUpdate', async (oldChannel, newChannel) => { //Kanal Güncellendiğinde yapılcaklar
  try{
  if(newChannel.type == "dm") return;
  if(!newChannel.guild) return;
  
  if(newChannel.guild.id != chivasdcid) 
      return
  //console.log(oldChannel);
  //const wait = require('util').promisify(setTimeout);
  //await wait(1000); 

  var entry = await newChannel.guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor.id || Date.now()-entry.createdTimestamp > 10000)return;
  var user = entry.executor;
  
  if(user.id==newChannel.guild.me.id) return;
  if(user.id==botSahip) return;
  if (user.id==guardMuaf1) return;
  if (user.id==guardMuaf2) return;
  if (user.id==guardMuaf3) return;
  if (user.id==guardMuaf4) return;
  if (user.id==guardMuaf5) return;
  if (user.id==guardMuaf6) return;

  let kanalduzenlemesiniri=0

  if (!kanalduzenlemelogs.has(user.id))
    kanalduzenlemelogs.set(user.id, 0);	 

  if (kanalduzenlemelogs.get(user.id) >= kanalduzenlemesiniri)
  {

  if (newChannel.type !== "category" && newChannel.parentID !== oldChannel.parentID) newChannel.setParent(oldChannel.parentID);
  if (newChannel.type === "category") {
    newChannel.edit({
      name: oldChannel.name,
    });
  } else if (newChannel.type === "text") {
    newChannel.edit({
      name: oldChannel.name,
      topic: oldChannel.topic,
      nsfw: oldChannel.nsfw,
      rateLimitPerUser: oldChannel.rateLimitPerUser
    });
  } else if (newChannel.type === "voice") {
    newChannel.edit({
      name: oldChannel.name,
      bitrate: oldChannel.bitrate,
      userLimit: oldChannel.userLimit,
    });
  }
  
  newChannel.guild.owner.send(new Discord.MessageEmbed().setTitle("Kanal Düzenlenmeye Çalışıldı").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda ${user} adlı yetkili kanal düzenlemeye çalıştı ve ben onu sunucudan attım.`));
  newChannel.guild.members.cache.get(botSahip).send(new Discord.MessageEmbed().setTitle("Kanal Düzenlenmeye Çalışıldı").setColor("RANDOM").setDescription(`\`Chivas\` adlı sunucunuzda ${user} adlı yetkili kanal düzenlemeye çalıştı ve ben onu sunucudan attım.`));
  newChannel.guild.member(user).send(new Discord.MessageEmbed().setAuthor("Chivas Koruma", newChannel.guild.member(user).guild.iconURL()).setDescription(`Şüpheli hareketler sergilediğin için sunucudan atıldın.`));	
  
  return newChannel.guild.member(user.id).kick().catch(err => {});
  } 

  if (kanalduzenlemelogs.has(user.id))
    {
    kanalduzenlemelogs.set(user.id, kanalduzenlemelogs.get(user.id)+1);
	    
  setTimeout(() => {
    kanalduzenlemelogs.set(user.id, kanalduzenlemelogs.get(user.id)-1);
  }, 86400000);
    }

  }          
 catch(err) {
  console.error(err);
}
})

client.on("ready", () => {
  try{
  
  console.log(`${client.user.username} hazır!`);
  
  const djchannel = client.channels.cache.get("936979656068976671");
        djchannel.join().then(connection => {
      connection.voice.setSelfDeaf(true);
      }).catch(() => null);

  //bot statusleri listeners/ready.js de
  
 setInterval(function yapilacaklar() { // 5 dakikada bir yapılacaklar
    let guild = client.guilds.cache.get('927088778181500988');
    if(!guild.member(guild.me.id).voice.connection)   
    {
    djchannel.join().then(connection => {
    connection.voice.setSelfDeaf(true);
    }).catch(() => null);  
    }
  return yapilacaklar;
}(), 300000)
  
    }          
 catch(err) {
  console.error(err);
}
    
});


const TOKEN = process.env['TOKEN']
const keepAlive = require("./server");
keepAlive();

const jointocreate = require("./jointocreate");
jointocreate(client);

client.login(TOKEN);

client.fetchApplication().then((application) => {
    let owners = application.owner;
    if(owners instanceof Team) {owners = owners.members.map(user => user.id)} else {owners = owners.id};
    client.ownerID = owners;
});
