const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const Discord = require ( "discord.js" );
const Sequelize = require('sequelize');
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
const logs = require ( "discord-logs" );
const ayarlar = require('./ayarlar.json');
const db = require ( "quick.db" );
var moment = require ( "moment" );
require ( "moment-duration-format" );
logs ( client );

const slashCommandList = [];
client.slashCommandList = slashCommandList;
let commandHandler = new CommandHandler(client, {
    directory: './commands/',
    allowMention: true,
    prefix: ".",
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

let pub = (ayarlar.PublicKategori); //  PUBLİC KATAGORİ ID
let kayıt = (ayarlar.KayıtKategori)   // KAYIT KATAGORİ ID
let terapi = (ayarlar.TerapiKategori)  // TERAPİ KATEGORİ ID
let sorun = (ayarlar.SorunÇözmeKategori)   // SORUN ÇÖZME KATAGORİ ID
let vk = (ayarlar.VKKategori)   // VAMPİR KÖYLÜ KATAGORİ ID
let dc = (ayarlar.DCKategori)  // DOĞRULUK CESARETLİK KATAGORİ ID
let game = (ayarlar.GameKategori)  // OYUN KATAGORİ ID
let priv = (ayarlar.PrivateKategori)    // PRİVATE KATAGORİ ID
let alone = (ayarlar.AloneKategori)   // ALONE KATAGORİ ID


const botSahip = "805161121711390750"
const hyperdcid = "854721457786454046"

//var mysql = require('mysql');
//const hyperdb = require("./hyperdbsurum");
//const HypeRDB = require("./hyperdb")
//const hyperdb = HypeRDB.open("hyper")
const jsondb = require("./hyperdb");
const hyperdb = new jsondb("hyper.db");
//--------------------- CONSOL AKTİF OLDUĞUNA DAİR MESAJ GÖNDERME ------------------------------------\\


//---------------------------------- BOTU SESLİ SOKMA ----------------------------------------\\


client.on("ready", () => {
  try{
  

  console.log(`${client.user.username} hazır!`);

  

  client.user.setPresence({
    status: 'idle',
    activity: {
        name: 'HypeR İstatistik',
        type: 'WATCHING',
    }
})   
  
  /*const djchannel = client.channels.cache.get("936979656068976671");
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
}(), 300000)*/

    setInterval(function yapilacaklar2() { // 1 dakikada bir yapılacaklar
    let guild = client.guilds.cache.get('854721457786454046');
    const voiceChannels = guild.channels.cache.filter(c => c.type === 'voice');
    for (const [id, voiceChannel] of voiceChannels){

 if(voiceChannel.id == "855588565429911583") continue //klavyeden uzakta seslisi

 voiceChannel.members.forEach(async member => {

   if ( member.user.bot ) return

   if(member.guild.voiceStates.cache.get(member.id).selfDeaf) return

   //if(member.id==botSahip)
   //console.log(member.guild.voiceStates.cache.get(member.id).selfDeaf)

    let channel = voiceChannel

    let data = db.fetch ( `1data:${ member.user.id }:${ channel.id }` );

    if ( data ) {
        let total = db.fetch ( `1total:${ member.user.id }:${ channel.id }` ) || {
            "total" : 0
        };

        const json = {
            "channel" : data.channel ,
            "total" : Number ( total.total ) + (
                60000
            )
        };
        db.set ( `1total:${ member.user.id }:${ channel.id }` , json );
        //db.delete ( `1data:${ member.user.id }:${ channel.id }` );
        db.add ( `2channel:${ channel.id }` , 60000 )
        db.add ( `1gorevsessayisi:${ member.user.id }` , 60000 )
        db.add ( `1toplamsessayisi:${ member.user.id }` , 60000 )
        hyperdb.add ( `1gorevsessayisi:${ member.user.id }` , 60000 )
        hyperdb.add ( `1toplamsessayisi:${ member.user.id }` , 60000 )
        /*if ( channel.parentID === pub ) {
            db.add (
                `1public:${ member.user.id }` ,
                60000
            );
        }
        else if ( channel.parentID == priv ) {
            db.add ( `1private:${ member.user.id }` , 60000 )
        }
        //else if ( channel.parentID == alone ) {
        //    db.add ( `1alone:${ member.user.id }` , new Date ()//.getTime () - Number ( data.start ) )
        //}
        else if ( channel.parentID == game ) {
            db.add ( `1game:${ member.user.id }` , 60000 )
        }
        else if ( channel.parentID == vk ) {
            db.add ( `1game:${ member.user.id }` , 60000 )
        }
        else if ( channel.parentID == dc ) {
            db.add ( `1game:${ member.user.id }` , 60000 )
        }
        else if ( channel.parentID == kayıt ) {
            db.add ( `1kayıt:${ member.user.id }` , 60000 )
        }
        else if ( channel.parentID == sorun ) {
            db.add ( `1mod:${ member.user.id }` , 60000 )
        }
        else if ( channel.parentID == terapi ) {
            db.add ( `1mod:${ member.user.id }` , 60000 )
        }
        */
    }


  });

}
   
  return yapilacaklar2;
}(), 60000);
  
    }          
 catch(err) {
  console.error(err);
}
    
});


//---------------------------------------------------------------------------------------\\

client.on ( "voiceStateUpdate" , ( oldState, newState ) => {
    let oldparentname = "unknown"
    let oldchannelname = "unknown"
    let oldchanelid = "unknown"
    if (oldState && oldState.channel && oldState.channel.parent && oldState.channel.parent.name) oldparentname = oldState.channel.parent.name
    if (oldState && oldState.channel && oldState.channel.name) oldchannelname = oldState.channel.name
    if (oldState && oldState.channelID) oldchanelid = oldState.channelID
    let newparentname = "unknown"
    let newchannelname = "unknown"
    let newchanelid = "unknown"
    if (newState && newState.channel && newState.channel.parent && newState.channel.parent.name) newparentname =    newState.channel.parent.name
    if (newState && newState.channel && newState.channel.name)  newchannelname = newState.channel.name
    if (newState && newState.channelID) newchanelid =   newState.channelID

    //if(!(!oldState.channelID && newState.channelID))
    //return
    
    if(!(newState.channelID))
    return

    //console.log("girdi")
       
    if ( newState.member.user.bot ) return
    const json = {
        "channel" : newchanelid ,
        "start" : new Date ().getTime ()
    };
    db.set ( `1data:${ newState.member.user.id }:${ newchanelid }` , json );
    //console.log(newState.member.user.id)
} );

//-----------------------------------------------------------------------------------------------------------------------------------\\


/*client.on ( "voiceStateUpdate" , ( oldState, newState ) => {
    let oldparentname = "unknown"
    let oldchannelname = "unknown"
    let oldchanelid = "unknown"
    if (oldState && oldState.channel && oldState.channel.parent && oldState.channel.parent.name) oldparentname = oldState.channel.parent.name
    if (oldState && oldState.channel && oldState.channel.name) oldchannelname = oldState.channel.name
    if (oldState && oldState.channelID) oldchanelid = oldState.channelID
    let newparentname = "unknown"
    let newchannelname = "unknown"
    let newchanelid = "unknown"
    if (newState && newState.channel && newState.channel.parent && newState.channel.parent.name) newparentname =    newState.channel.parent.name
    if (newState && newState.channel && newState.channel.name)  newchannelname = newState.channel.name
    if (newState && newState.channelID) newchanelid =   newState.channelID

    

    if(!(!newState.channelID && oldState.channelID))
    return
 
    let member = oldState.member;
    let channel = client.channels.cache.get(oldchanelid);


    if ( oldState.member.user.bot ) return
    //if (!member.roles.cache.has ("YETKİLİ ROL ID")) return     // Yetkili Rol ID ( KOMUTU KULLANABİLCEK )
    let data = db.fetch ( `1data:${ member.user.id }:${ channel.id }` );
    if ( data ) {
        let total = db.fetch ( `1total:${ member.user.id }:${ channel.id }` ) || {
            "total" : 0
        };

        const json = {
            "channel" : data.channel ,
            "total" : Number ( total.total ) + (
                60000
            )
        };
        db.set ( `1total:${ member.user.id }:${ channel.id }` , json );
        db.delete ( `1data:${ member.user.id }:${ channel.id }` );
        db.add ( `2channel:${ channel.id }` , 60000 )
        db.add ( `1gorevsessayisi:${ member.user.id }` , 60000 )
        db.add ( `1toplamsessayisi:${ member.user.id }` , 60000 )

        if ( channel.parentID === pub ) {
            db.add (
                `1public:${ member.user.id }` ,
                60000
            );
        }
        else if ( channel.parentID == priv ) {
            db.add ( `1private:${ member.user.id }` , 60000 )
        }
        //else if ( channel.parentID == alone ) {
        //    db.add ( `1alone:${ member.user.id }` , new Date ()//.getTime () - Number ( data.start ) )
        //}
        else if ( channel.parentID == game ) {
            db.add ( `1game:${ member.user.id }` , 60000 )
        }
        else if ( channel.parentID == vk ) {
            db.add ( `1game:${ member.user.id }` , 60000 )
        }
        else if ( channel.parentID == dc ) {
            db.add ( `1game:${ member.user.id }` , 60000 )
        }
        else if ( channel.parentID == kayıt ) {
            db.add ( `1kayıt:${ member.user.id }` , 60000 )
        }
        else if ( channel.parentID == sorun ) {
            db.add ( `1mod:${ member.user.id }` , 60000 )
        }
        else if ( channel.parentID == terapi ) {
            db.add ( `1mod:${ member.user.id }` , 60000 )
        }
    }
} );
*/
//-----------------------------------------------------------------------------------------------------------------------------------\\


//-----------------------------------------------------------------------------------------------------------------------------------\\
/*
client.on ( "voiceChannelSwitch" , ( member , oldChannel , newChannel ) => {
    if ( member.user.bot ) return
    let data = db.fetch ( `1data:${ member.user.id }:${ oldChannel.id }` );
    if ( data ) {
        let mainData = db.fetch ( `1total:${ member.user.id }:${ data.channel }` ) || {
            "total" : 0
        };
        const json = {
            "channel" : data.channel ,
            "total" :
                Number ( mainData.total ) + (
                60000
                                          )
        };
        db.set ( `1total:${ member.user.id }:${ oldChannel.id }` , json );
        db.add ( `2channel:${ oldChannel.id }` , 60000 )
        db.add ( `1gorevsessayisi:${ member.user.id }` , 60000 )
        db.add ( `1toplamsessayisi:${ member.user.id }` , 60000 )
        const json2 = {
            "channel" : newChannel.id ,
            "start" : new Date ().getTime ()
        };
        db.set ( `1data:${ member.user.id }:${ newChannel.id }` , json2 );
        if ( oldChannel.parentID === pub ) {
            db.add (
                `1public:${ member.user.id }` ,
                60000
            );
        }
        else if ( oldChannel.parentID == priv ) {
            db.add ( `1private:${ member.user.id }` , 60000 )
        }
        //else if ( oldChannel.parentID == alone ) {
        //    db.add ( `1alone:${ member.user.id }` , new Date ()//.getTime () - Number ( data.start ) )
        //}
        else if ( oldChannel.parentID == game ) {
            db.add ( `1game:${ member.user.id }` , 60000 )
        }
        else if ( oldChannel.parentID == vk ) {
            db.add ( `1game:${ member.user.id }` , 60000 )
        }
        else if ( oldChannel.parentID == dc ) {
            db.add ( `1game:${ member.user.id }` , 60000 )
        }
        else if ( oldChannel.parentID == kayıt ) {
            db.add ( `1kayıt:${ member.user.id }` , 60000 )
        }
        else if ( oldChannel.parentID == sorun ) {
            db.add ( `1mod:${ member.user.id }` , 60000 )
        }
        else if ( oldChannel.parentID == terapi ) {
            db.add ( `1mod:${ member.user.id }` , 60000 )
        }
    }
} );
*/
//-----------------------------------------------------------------------------------------------------------------------------------\\




//-----------------------------------------------------------------------------------------------------------------------------------\\

client.on('message', async (message) => {
  try{	
	
  if (message.channel.type == "dm") return;
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.member.id==message.guild.me.id) return;

  if(message.guild.id != hyperdcid) 
      return

  let argumanlar = message.content.replace(/ +(?= )/g,'').split(' ');

  if(argumanlar[0]=="!komut" && message.member.id==botSahip)
  {
    //hyperdb.add("t242424otalMessage:805161121711390750", 345)

    /*const json = {
            "channel" : "abuuu" ,
            "total" : 56
        };

    hyperdb.set("totalMessage:805161121711390750", json)
    test = hyperdb.get("totalMessage:805161121711390750")
    console.log(test)
    */
  //hyperdb.set("foo", "bar");
  //let deneme = hyperdb.get("foo")
    //console.log(deneme)
  //hyperdb.set("foo34", "bar45")
  //let infoo = hyperdb.get("foo3")
  //  console.log(infoo)
    
  /*const json = {
        "channel" : "TTEE/" ,
        "start" : new Date ().getTime ()
  };

  hyperdb.set("testing", 51635)
*/
  //let data = hyperdb.fetch("testing")

  //console.log(data)


    
  //hyperdb.set("1toplamsessayisi:805161121711390750", 5)
  //hyperdb.set("1toplamsessayisi:8051611217113907501", 104)

  //console.log(j);

  
  message.guild.members.cache.forEach(async member => {
   var sessayisi = await db.fetch ( `1toplamsessayisi:${ member.id }` ) || 0;
   var mesajsayisi = await db.fetch ( `totalMessage:${ member.id }` ) || 0;
   var davetsayisi = await db.fetch ( `1davetsayisi:${ member.id }` ) || 0;
   var kayitsayisi = await db.fetch ( `1kayitsayisi:${ member.id }` ) || 0;
   var gorevsessayisi = await db.fetch ( `1gorevsessayisi:${ member.id }` ) || 0;
   var gorevmesajsayisi = await db.fetch ( `1gorevmesajsayisi:${ member.id }` ) || 0;
   var gorevkayitsayisi = await db.fetch ( `1gorevkayitsayisi:${ member.id }` ) || 0;
   var gorevdavetsayisi = await db.fetch ( `1gorevdavetsayisi:${ member.id }` ) || 0;
   var klankayitsayisi = await db.fetch ( `1klankayitsayisi:${ member.id }` ) || 0;
   var tarafsizkayitsayisi = await db.fetch ( `1tarafsizkayitsayisi:${ member.id }` ) || 0;
   var allykayitsayisi = await db.fetch ( `1allykayitsayisi:${ member.id }` ) || 0;
   var ozeluyekayitsayisi = await db.fetch ( `1ozeluyekayitsayisi:${ member.id }` ) || 0;
   var gorevverilenguncakma = await db.fetch ( `1gorevverilenguncakma:${ member.id }` ) || 0;
   var gorevverilengun = await db.fetch ( `1gorevverilengun:${ member.id }` ) || 0;

  if(sessayisi)
   hyperdb.set("1toplamsessayisi:"+member.id, sessayisi)
  if(mesajsayisi)
   hyperdb.set("totalMessage:"+member.id, mesajsayisi)
  if(davetsayisi)
   hyperdb.set("1davetsayisi:"+member.id, davetsayisi)
  if(kayitsayisi)
   hyperdb.set("1kayitsayisi:"+member.id, kayitsayisi)
  if(gorevsessayisi)
   hyperdb.set("1gorevsessayisi:"+member.id, gorevsessayisi)
  if(gorevmesajsayisi)
   hyperdb.set("1gorevmesajsayisi:"+member.id, gorevmesajsayisi)
  if(gorevkayitsayisi)
   hyperdb.set("1gorevkayitsayisi:"+member.id, gorevkayitsayisi)
  if(gorevdavetsayisi)
   hyperdb.set("1gorevdavetsayisi:"+member.id, gorevdavetsayisi)
  if(klankayitsayisi)
   hyperdb.set("1klankayitsayisi:"+member.id, klankayitsayisi)
  if(tarafsizkayitsayisi)
   hyperdb.set("1tarafsizkayitsayisi:"+member.id, tarafsizkayitsayisi)
  if(allykayitsayisi)
   hyperdb.set("1allykayitsayisi:"+member.id, allykayitsayisi)
  if(ozeluyekayitsayisi)
   hyperdb.set("1ozeluyekayitsayisi:"+member.id, ozeluyekayitsayisi)
  if(gorevverilenguncakma)
   hyperdb.set("1gorevverilenguncakma:"+member.id, gorevverilenguncakma)
  if(gorevverilengun)
   hyperdb.set("1gorevverilengun:"+member.id, gorevverilengun)
   
  })

  
    
    /*let money = db.all()
  .map(entry => entry.ID)
  .filter(id => id.startsWith(`1total`))

money.forEach(db.delete)
*/

    /*if(message.member.id!=botSahip)
      return
    var con = mysql.createConnection({
  host: "eu-cdbr-west-01.cleardb.com",
  user: "b6f9d8146912ec",
  password: "ad54b3cd",
  database: "heroku_916f7d6eaafef72"
});

con.on('error', function() {});


  con.query(`SELECT * FROM discord ORDER BY ABS(davetsayisi)`, function (err, result, fields) {
if (err) return console.error(err);
if(!result || result.length<=0) return
  

for (let i = 0; i < result.length; i++) {

  db.set ( `1toplamsessayisi:${ result[i].discordid }` , result[i].sesaktifligi*1000*60 );
}
  
});*/


  }

  if(argumanlar[0]=="!klankayıt" || argumanlar[0]=="!klankayit" || argumanlar[0]=="!tarafsızkayıt" || argumanlar[0]=="!tarafsızkayit" || argumanlar[0]=="!tarafsizkayıt" || argumanlar[0]=="!tarafsizkayit" || argumanlar[0]=="!allykayıt" || argumanlar[0]=="!allykayit" || argumanlar[0]=="!müttefikkayıt" || argumanlar[0]=="!müttefikkayit" || argumanlar[0]=="!muttefikkayıt" || argumanlar[0]=="!muttefikkayit" || argumanlar[0]=="!özelüyekayıt" || argumanlar[0]=="!ozeluyekayit")
  {
  if(!(message.channel.id === '854721457824071735')) return;    
 
  if (!message.member.roles.cache.has("855557176146657320") && !message.member.roles.cache.has("855557251380936734") && !message.member.roles.cache.has("855591255621632021") && !message.member.roles.cache.has("874287678923894825") && !message.member.roles.cache.has("855557264606101524") && !message.member.roles.cache.has("855561395570737173") && !message.member.hasPermission('ADMINISTRATOR')) return 

  let kullanıcı = message.mentions.users.first();
  if (!kullanıcı) return 

  let member = message.guild.member(kullanıcı);

  if(!member.roles.cache.has("855560965621415986"))
  return

  let isim = argumanlar[2];
      if(!isim) return 
  let yas = argumanlar[3];
      if(!yas) return 

  //var kayitsayisi = await db.fetch ( `1kayitsayisi:${ message.author.id }` ) || 0;

  db.add(`1kayitsayisi:${ message.author.id }` , 1);
  db.add(`1gorevkayitsayisi:${ message.author.id }` , 1);
  hyperdb.add(`1kayitsayisi:${ message.author.id }` , 1);
  hyperdb.add(`1gorevkayitsayisi:${ message.author.id }` , 1);


  if(argumanlar[0]=="!klankayıt" || argumanlar[0]=="!klankayit")
  {
    db.add(`1klankayitsayisi:${ message.author.id }` , 1);
    hyperdb.add(`1klankayitsayisi:${ message.author.id }` , 1);
  }

  if(argumanlar[0]=="!tarafsızkayıt" || argumanlar[0]=="!tarafsızkayit" || argumanlar[0]=="!tarafsizkayıt" || argumanlar[0]=="!tarafsizkayit")
  {
    db.add(`1tarafsizkayitsayisi:${ message.author.id }` , 1);
    hyperdb.add(`1tarafsizkayitsayisi:${ message.author.id }` , 1);
  }

  if(argumanlar[0]=="!allykayıt" || argumanlar[0]=="!allykayit" || argumanlar[0]=="!müttefikkayıt" || argumanlar[0]=="!müttefikkayit" || argumanlar[0]=="!muttefikkayıt" || argumanlar[0]=="!muttefikkayit")
  {
    db.add(`1allykayitsayisi:${ message.author.id }` , 1);
    hyperdb.add(`1allykayitsayisi:${ message.author.id }` , 1);
  }

  if(argumanlar[0]=="!özelüyekayıt" || argumanlar[0]=="!ozeluyekayit")
  {
    db.add(`1ozeluyekayitsayisi:${ message.author.id }` , 1);
    hyperdb.add(`1ozeluyekayitsayisi:${ message.author.id }` , 1);
  }
  
  }

  if(argumanlar[0]=="!siralamaduzenle" || argumanlar[0]=="!sıralamadüzenle")
  {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(new Discord.MessageEmbed().addField(`HypeR`, `Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!`).setColor('#ff151b')).then(m => m.delete({timeout: 10000}));

let dogrukullanim=`

${argumanlar[0]} mesaj @discordismi yeniMesajSayısı
${argumanlar[0]} ses @discordismi yeniSesSayısı
${argumanlar[0]} kayıt @discordismi yeniKayıtSayısı
${argumanlar[0]} davet @discordismi yeniDavetSayısı
`
    if(!argumanlar[1])
      return message.channel.send(dogrukullanim)

    if(argumanlar[1]!="mesaj" && argumanlar[1]!="ses" && argumanlar[1]!="kayıt" && argumanlar[1]!="kayit" && argumanlar[1]!="davet")
      return message.channel.send(dogrukullanim)

    if(argumanlar[1]=="mesaj")
    {
      let kullanıcı = message.mentions.users.first();
      if (!kullanıcı) return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      let member = message.guild.member(kullanıcı);

      if(!argumanlar[3])
        return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      if(isNaN(argumanlar[3]))
        return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      db.set(`3mesajKanal:${ member.id }` , parseInt(argumanlar[3]));

      message.channel.send("Kullanıcının mesaj görevi başarıyla güncellendi.")
    }

    if(argumanlar[1]=="ses")
    {
      let kullanıcı = message.mentions.users.first();
      if (!kullanıcı) return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      let member = message.guild.member(kullanıcı);

      if(!argumanlar[3])
        return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      if(isNaN(argumanlar[3]))
        return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      db.set(`1toplamsessayisi:${ member.id }` , parseInt(argumanlar[3])*1000*60);
      hyperdb.set(`1toplamsessayisi:${ member.id }` , parseInt(argumanlar[3])*1000*60);

      message.channel.send("Kullanıcının ses görevi başarıyla güncellendi.")
    }

    if(argumanlar[1]=="kayıt" || argumanlar[1]=="kayit")
    {
      let kullanıcı = message.mentions.users.first();
      if (!kullanıcı) return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      let member = message.guild.member(kullanıcı);

      if(!argumanlar[3])
        return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      if(isNaN(argumanlar[3]))
        return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      db.set(`1kayitsayisi:${ member.id }` , parseInt(argumanlar[3]));
      hyperdb.set(`1kayitsayisi:${ member.id }` , parseInt(argumanlar[3]));

      message.channel.send("Kullanıcının kayıt görevi başarıyla güncellendi.")
    }

    if(argumanlar[1]=="davet")
    {
      let kullanıcı = message.mentions.users.first();
      if (!kullanıcı) return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      let member = message.guild.member(kullanıcı);

      if(!argumanlar[3])
        return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      if(isNaN(argumanlar[3]))
        return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      db.set(`1davetsayisi:${ member.id }` , parseInt(argumanlar[3]));
      hyperdb.set(`1davetsayisi:${ member.id }` , parseInt(argumanlar[3]));

      message.channel.send("Kullanıcının davet görevi başarıyla güncellendi.")
    }

    if(argumanlar[1]=="gün" || argumanlar[1]=="gun")
    {
      let kullanıcı = message.mentions.users.first();
      if (!kullanıcı) return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      let member = message.guild.member(kullanıcı);

      if(!argumanlar[3])
        return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      if(isNaN(argumanlar[3]))
        return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      db.set(`1gorevverilenguncakma:${ member.id }` , new Date().getTime() - parseInt(argumanlar[3])*1000*60*60*24);
      hyperdb.set(`1gorevverilenguncakma:${ member.id }` , new Date().getTime() - parseInt(argumanlar[3])*1000*60*60*24);

      message.channel.send("Kullanıcının rolde kalma görevi başarıyla güncellendi.")
    }


  }

  if(argumanlar[0]=="!gorevduzenle" || argumanlar[0]=="!görevdüzenle")
  {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(new Discord.MessageEmbed().addField(`HypeR`, `Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!`).setColor('#ff151b')).then(m => m.delete({timeout: 10000}));

let dogrukullanim=`

${argumanlar[0]} mesaj @discordismi yeniMesajSayısı
${argumanlar[0]} ses @discordismi yeniSesSayısı
${argumanlar[0]} kayıt @discordismi yeniKayıtSayısı
${argumanlar[0]} davet @discordismi yeniDavetSayısı
${argumanlar[0]} gün @discordismi yeniGünSayısı
`
    if(!argumanlar[1])
      return message.channel.send(dogrukullanim)

    if(argumanlar[1]!="mesaj" && argumanlar[1]!="ses" && argumanlar[1]!="kayıt" && argumanlar[1]!="kayit" && argumanlar[1]!="gün" && argumanlar[1]!="gun" && argumanlar[1]!="davet")
      return message.channel.send(dogrukullanim)

    if(argumanlar[1]=="mesaj")
    {
      let kullanıcı = message.mentions.users.first();
      if (!kullanıcı) return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      let member = message.guild.member(kullanıcı);

      if(!argumanlar[3])
        return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      if(isNaN(argumanlar[3]))
        return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      db.set(`1gorevmesajsayisi:${ member.id }` , parseInt(argumanlar[3]));
      hyperdb.set(`1gorevmesajsayisi:${ member.id }` , parseInt(argumanlar[3]));

      message.channel.send("Kullanıcının mesaj görevi başarıyla güncellendi.")
    }

    if(argumanlar[1]=="ses")
    {
      let kullanıcı = message.mentions.users.first();
      if (!kullanıcı) return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      let member = message.guild.member(kullanıcı);

      if(!argumanlar[3])
        return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      if(isNaN(argumanlar[3]))
        return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      db.set(`1gorevsessayisi:${ member.id }` , parseInt(argumanlar[3])*1000*60);
      hyperdb.set(`1gorevsessayisi:${ member.id }` , parseInt(argumanlar[3])*1000*60);

      message.channel.send("Kullanıcının ses görevi başarıyla güncellendi.")
    }

    if(argumanlar[1]=="kayıt" || argumanlar[1]=="kayit")
    {
      let kullanıcı = message.mentions.users.first();
      if (!kullanıcı) return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      let member = message.guild.member(kullanıcı);

      if(!argumanlar[3])
        return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      if(isNaN(argumanlar[3]))
        return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      db.set(`1gorevkayitsayisi:${ member.id }` , parseInt(argumanlar[3]));
      hyperdb.set(`1gorevkayitsayisi:${ member.id }` , parseInt(argumanlar[3]));

      message.channel.send("Kullanıcının kayıt görevi başarıyla güncellendi.")
    }

    if(argumanlar[1]=="davet")
    {
      let kullanıcı = message.mentions.users.first();
      if (!kullanıcı) return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      let member = message.guild.member(kullanıcı);

      if(!argumanlar[3])
        return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      if(isNaN(argumanlar[3]))
        return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      db.set(`1gorevdavetsayisi:${ member.id }` , parseInt(argumanlar[3]));
      hyperdb.set(`1gorevdavetsayisi:${ member.id }` , parseInt(argumanlar[3]));

      message.channel.send("Kullanıcının davet görevi başarıyla güncellendi.")
    }

    if(argumanlar[1]=="gün" || argumanlar[1]=="gun")
    {
      let kullanıcı = message.mentions.users.first();
      if (!kullanıcı) return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      let member = message.guild.member(kullanıcı);

      if(!argumanlar[3])
        return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      if(isNaN(argumanlar[3]))
        return message.reply(dogrukullanim).then(m => m.delete({timeout: 10000}));

      db.set(`1gorevverilenguncakma:${ member.id }` , new Date().getTime() - parseInt(argumanlar[3])*1000*60*60*24);
      hyperdb.set(`1gorevverilenguncakma:${ member.id }` , new Date().getTime() - parseInt(argumanlar[3])*1000*60*60*24);

      message.channel.send("Kullanıcının rolde kalma görevi başarıyla güncellendi.")
    }


  }

  if(argumanlar[0]=="!görevlerim" || argumanlar[0]=="!gorevlerim")
  {
    var user = message.mentions.users.first ();
        if(user)
        {
          if(!message.member.hasPermission('ADMINISTRATOR'))
           return message.channel.send("Başkalarının istatistiklerine bakabilmen için gerekli yetkin bulunmuyor.")
        }
        user = user ? user : message.author;

    let aktif=0
    let rolbulundu=0
    let bironcekirol=0
    let rolarray=[];

    let enustrol = message.guild.roles.cache.find(role => role.name === "💥 | Admin");
    let enaltrol = message.guild.roles.cache.find(role => role.name === "🎓 | Deneme Alım Sorumlusu");

    message.guild.roles.cache.sort((a, b) => b.position - a.position).forEach(role => {
    
    if (role.id == enustrol.id) aktif = 1; 

    if (aktif==1) {
        if(role.name!="🎥 | Youtuber" && role.name!="🔐" && role.name!="<────•        YETKİLİ ROLLERİ        •────>")
        {
        if (role.id==enaltrol)
         aktif=2

        if(!rolbulundu)
        {
          rolarray.push(role.id)

        if(message.guild.member(user).roles.cache.has(role.id))
        {
          rolbulundu=role.id
        }

        }
        else
          return

        }

      }


    })

    if(rolarray.length>=2)
    bironcekirol=rolarray[rolarray.length-2]

    if(rolbulundu==enustrol.id)
      bironcekirol=0

    if(bironcekirol==0)
      return message.channel.send("Tüm yetkileri atlamışsın ve tüm görevlerini bitirmişsin. Sana ait bir görev bulunamadı.")

    if(rolbulundu==0)
      return message.channel.send("Yetkin var fakat atlanılabilecek türden bir yetki değil.")

    const gorevrolleri = new Map();
    gorevrolleri.set("855558404192731188", "855558403115581470")
    gorevrolleri.set("855558403115581470", "855571250210537523")
    gorevrolleri.set("855571250210537523", "855558332412854302")
    gorevrolleri.set("855558332412854302", "855558317820477440")
    gorevrolleri.set("855558317820477440", "855558300925165598")
    gorevrolleri.set("855558300925165598", "855557326500397086")
    gorevrolleri.set("855557326500397086", "855557307931688981")
    gorevrolleri.set("855557307931688981", "870048282070618163")
    const gereklimesajsayilari = new Map();
    const gereklisessayilari = new Map();
    const gerekligenelgunsayilari = new Map();
    const gereklikayitsayilari = new Map();
    const gereklidavetsayilari = new Map();

    //deneme alım
    gereklimesajsayilari.set("855558404192731188", 100)
    gereklisessayilari.set("855558404192731188", 750)
    gerekligenelgunsayilari.set("855558404192731188", 5)
    gereklikayitsayilari.set("855558404192731188", 3)
    gereklidavetsayilari.set("855558404192731188", 5)

    //alım
    gereklimesajsayilari.set("855558403115581470", 150)
    gereklisessayilari.set("855558403115581470", 1500)
    gerekligenelgunsayilari.set("855558403115581470", 7)
    gereklikayitsayilari.set("855558403115581470", 5)
    gereklidavetsayilari.set("855558403115581470", 15)

    //6.
    gereklimesajsayilari.set("855571250210537523", 150)
    gereklisessayilari.set("855571250210537523", 1500)
    gerekligenelgunsayilari.set("855571250210537523", 7)
    gereklikayitsayilari.set("855571250210537523", 5)
    gereklidavetsayilari.set("855571250210537523", 15)

    //5.
    gereklimesajsayilari.set("855558332412854302", 150)
    gereklisessayilari.set("855558332412854302", 1500)
    gerekligenelgunsayilari.set("855558332412854302", 7)
    gereklikayitsayilari.set("855558332412854302", 5)
    gereklidavetsayilari.set("855558332412854302", 15)

    //4.
    gereklimesajsayilari.set("855558317820477440", 250)
    gereklisessayilari.set("855558317820477440", 2000)
    gerekligenelgunsayilari.set("855558317820477440", 14)
    gereklikayitsayilari.set("855558317820477440", 10)
    gereklidavetsayilari.set("855558317820477440", 20)

    //3.
    gereklimesajsayilari.set("855558300925165598", 250)
    gereklisessayilari.set("855558300925165598", 2500)
    gerekligenelgunsayilari.set("855558300925165598", 14)
    gereklikayitsayilari.set("855558300925165598", 15)
    gereklidavetsayilari.set("855558300925165598", 25)

    //2.
    gereklimesajsayilari.set("855557326500397086", 300)
    gereklisessayilari.set("855557326500397086", 2500)
    gerekligenelgunsayilari.set("855557326500397086", 21)
    gereklikayitsayilari.set("855557326500397086", 20)
    gereklidavetsayilari.set("855557326500397086", 30)

    //1.
    gereklimesajsayilari.set("855557307931688981", 750)
    gereklisessayilari.set("855557307931688981", 7500)
    gerekligenelgunsayilari.set("855557307931688981", 30)
    gereklikayitsayilari.set("855557307931688981", 25)
    gereklidavetsayilari.set("855557307931688981", 45)

    if(!gereklimesajsayilari.has(rolbulundu))
      return message.channel.send("Yetkin var fakat atlanılabilecek türden bir yetki değil.")

    let gereklimesajsayisi= gereklimesajsayilari.get(rolbulundu)
    let gereklisessayisi= gereklisessayilari.get(rolbulundu)
    let gerekligenelgunsayisi= gerekligenelgunsayilari.get(rolbulundu)
    let gereklikayitsayisi= gereklikayitsayilari.get(rolbulundu)
    let gereklidavetsayisi= gereklidavetsayilari.get(rolbulundu)

    var yapilanmesaj= await db.fetch ( `1gorevmesajsayisi:${ user.id }` ) || 0;

    var yapilanses= await db.fetch ( `1gorevsessayisi:${ user.id }` ) || 0;

    //yapilanses=moment.duration ( Number ( yapilanses ) ).format ( "m" ) 
    yapilanses= Math.round(Number ( yapilanses/60000 ))

    var gorevverilengun = await db.fetch ( `1gorevverilengun:${ user.id }` ) || 0;

    var gorevverilenguncakma = await db.fetch ( `1gorevverilenguncakma:${ user.id }` ) || 0;

    if(!gorevverilengun)
    {
      db.set(`1gorevverilengun:${ user.id }` , new Date().getTime());

      db.set(`1gorevverilenguncakma:${ user.id }` , new Date().getTime());

      hyperdb.set(`1gorevverilengun:${ user.id }` , new Date().getTime());

      hyperdb.set(`1gorevverilenguncakma:${ user.id }` , new Date().getTime());
    }

    var yapilankayit = await db.fetch ( `1gorevkayitsayisi:${ user.id }` ) || 0;

    var yapilandavet = await db.fetch ( `1gorevdavetsayisi:${ user.id }` ) || 0;

    var yapilangunsure
    let yapilangunstring
    if(gorevverilenguncakma)
    {
        yapilangunsure = new Date() - gorevverilenguncakma
        yapilangunstring = Math.floor(yapilangunsure/(1000*60*60*24))
    }
    else
    {
      yapilangunsure=0
      yapilangunstring=0
    }

    let tarihstring;

    if(gorevverilengun)
    {
    tarihstring = gorevverilengun.toString();
    tarihstring =  tarihstring.substring(0,tarihstring.length-3)
    }
    else
    {
      gorevverilengun = new Date();
      tarihstring = gorevverilengun.getTime().toString();
      tarihstring =  tarihstring.substring(0,tarihstring.length-3)
    }

    let mesajmesaji=`
**➥${gereklimesajsayisi} Mesaj Gönder.**
    `
    { //mesaj mesaji
    if(yapilanmesaj/gereklimesajsayisi>=0.1)
      mesajmesaji+=`<:fill_start:939851772917342208>`
    else
      mesajmesaji+=`<:empty_start:939851742219206667>`


    for(let i=2; i<=9; i++)
    {
      if(yapilanmesaj/gereklimesajsayisi>=i*0.1)
        mesajmesaji+=`<:fill:939851764943970324>`
      else
        mesajmesaji+=`<:empty:939851730110267412>`
    }

    if(yapilanmesaj/gereklimesajsayisi>=1)
      mesajmesaji+=`<:fill_end:939851754860838952>`
    else
      mesajmesaji+=`<:empty_end:939851717338611742>`

    mesajmesaji+=` \`${yapilanmesaj} / ${gereklimesajsayisi}\``
    } //mesaj mesaji

    let sesmesaji=`
**➥${gereklisessayisi} Dakika Tüm Ses Kanallarında Takıl.**
    `
    { //mesaj mesaji
    if(yapilanses/gereklisessayisi>=0.1)
      sesmesaji+=`<:fill_start:939851772917342208>`
    else
      sesmesaji+=`<:empty_start:939851742219206667>`


    for(let i=2; i<=9; i++)
    {
      if(yapilanses/gereklisessayisi>=i*0.1)
        sesmesaji+=`<:fill:939851764943970324>`
      else
        sesmesaji+=`<:empty:939851730110267412>`
    }

    if(yapilanses/gereklisessayisi>=1)
      sesmesaji+=`<:fill_end:939851754860838952>`
    else
      sesmesaji+=`<:empty_end:939851717338611742>`

    sesmesaji+=` \`${yapilanses} / ${gereklisessayisi}\``
    } //ses mesaji

    let davetmesaji=`
**➥Sunucuya ${gereklidavetsayisi} Davet Yap.**
    `
    { //mesaj mesaji
    if(yapilandavet/gereklidavetsayisi>=0.1)
      davetmesaji+=`<:fill_start:939851772917342208>`
    else
      davetmesaji+=`<:empty_start:939851742219206667>`


    for(let i=2; i<=9; i++)
    {
      if(yapilandavet/gereklidavetsayisi>=i*0.1)
        davetmesaji+=`<:fill:939851764943970324>`
      else
        davetmesaji+=`<:empty:939851730110267412>`
    }

    if(yapilandavet/gereklidavetsayisi>=1)
      davetmesaji+=`<:fill_end:939851754860838952>`
    else
      davetmesaji+=`<:empty_end:939851717338611742>`

    davetmesaji+=` \`${yapilandavet} / ${gereklidavetsayisi}\``
    } //kayit mesaji

    let kayitmesaji=`
**➥${gereklikayitsayisi} Kayıt Yap.**
    `
    { //mesaj mesaji
    if(yapilankayit/gereklikayitsayisi>=0.1)
      kayitmesaji+=`<:fill_start:939851772917342208>`
    else
      kayitmesaji+=`<:empty_start:939851742219206667>`


    for(let i=2; i<=9; i++)
    {
      if(yapilankayit/gereklikayitsayisi>=i*0.1)
        kayitmesaji+=`<:fill:939851764943970324>`
      else
        kayitmesaji+=`<:empty:939851730110267412>`
    }

    if(yapilankayit/gereklikayitsayisi>=1)
      kayitmesaji+=`<:fill_end:939851754860838952>`
    else
      kayitmesaji+=`<:empty_end:939851717338611742>`

    kayitmesaji+=` \`${yapilankayit} / ${gereklikayitsayisi}\``
    } //kayit mesaji

    let gunmesaji=`
**➥Rolde ${gerekligenelgunsayisi} Gün Boyunca Kal.**
    `
    { //mesaj mesaji
    if(yapilangunstring/gerekligenelgunsayisi>=0.1)
      gunmesaji+=`<:fill_start:939851772917342208>`
    else
      gunmesaji+=`<:empty_start:939851742219206667>`


    for(let i=2; i<=9; i++)
    {
      if(yapilangunstring/gerekligenelgunsayisi>=i*0.1)
        gunmesaji+=`<:fill:939851764943970324>`
      else
        gunmesaji+=`<:empty:939851730110267412>`
    }

    if(yapilangunstring/gerekligenelgunsayisi>=1)
      gunmesaji+=`<:fill_end:939851754860838952>`
    else
      gunmesaji+=`<:empty_end:939851717338611742>`

    gunmesaji+=` \`${yapilangunstring} / ${gerekligenelgunsayisi}\``
    } //gün mesaji

    let yapilangorevsayisi=0

    if(yapilanmesaj/gereklimesajsayisi>=1)
      yapilangorevsayisi++

    if(yapilanses/gereklisessayisi>=1)
      yapilangorevsayisi++

    if(yapilandavet/gereklidavetsayisi>=1)
      yapilangorevsayisi++

    if(yapilankayit/gereklikayitsayisi>=1)
      yapilangorevsayisi++

    if(yapilangunstring/gerekligenelgunsayisi>=1)
      yapilangorevsayisi++

    let gorevsayisi=5

    const embed = new Discord.MessageEmbed ()
            .setAuthor ( user.tag , user.avatarURL ( { "dynamic" : true } ) )
            .setFooter('HypeR')
            .setTimestamp()
            .setColor ( "RANDOM" )
            .setThumbnail ( user.avatarURL ( { "dynamic" : true } ) )
            .setColor ( "RANDOM" ).setDescription ( `${ message.guild.member(user) } (<@&${rolbulundu}>) üyesinin rolüne ait görevleri aşağıda belirtilmiştir.
**Görev Tarihi:** <t:${tarihstring}>
**Tamamlanan Görev Sayısı:** \`${yapilangorevsayisi} / ${gorevsayisi}\`
${mesajmesaji}
${sesmesaji}
${davetmesaji}
${kayitmesaji}
${gunmesaji}
Şu an <@&${rolbulundu}> rolündesiniz. Bir sonraki <@&${gorevrolleri.get(rolbulundu)}> rolüne yükselmek için gereken görevleri tamamlamalısınız.
    ` );

    message.channel.send(embed);
  }

  
  }
 catch(err) {
  console.error(err);
}  
})

client.on ( "message" , async message => {
    if (message.channel.type == "dm") return;
    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.member.id==message.guild.me.id) return;

    if(message.guild.id != hyperdcid) 
      return

    let member = message.guild.members.cache.get ( message.author.id )
    var totall = (
                     await db.fetch (
                         `messageCount:${ message.author.id }:${ message.channel.id }`
                     )
                 ) || { "count" : 0 };
    db.set ( `messageCount:${ message.author.id }:${ message.channel.id }` , {
        "channel" : message.channel.id ,
        "count" : totall.count + 1
    } );
    db.add ( `totalMessage:${ message.author.id }` , 1 );
    hyperdb.add ( `totalMessage:${ message.author.id }` , 1 );
    db.add ( `1gorevmesajsayisi:${ message.author.id }` , 1 );
    hyperdb.add ( `1gorevmesajsayisi:${ message.author.id }` , 1 );
    db.add ( `3mesajKanal:${ message.channel.id }` , 1 )
    var st = message.member.voice;
    var data = await db.fetch ( `1data:${ message.author.id }:${ st.channelID }` );
    if ( data ) {
        /*var total = (
                        await db.fetch (
                            `1total:${ message.author.id }:${ data.channel }`
                        )
                    ) || { "total" : 0 };
        const json = {
            "channel" : data.channel ,
            "total" : Number ( total.total ) + (
                Date.now () - Number ( data.start )
            )
        };
        db.set ( `1total:${ message.author.id }:${ data.channel }` , json );
        */
        /*
        db.delete ( `1data:${ message.author.id }:${ st.channelID }` );
        const json2 = {
            "channel" : st.channelID ,
            "start" : Date.now ()
        };
        db.set ( `1data:${ message.author.id }:${ st.channelID }` , json2 );
        db.add ( `2channel:${ st.channelID }` , 60000 )
        db.add ( `1gorevsessayisi:${ member.user.id }` , 60000 )
        db.add ( `1toplamsessayisi:${ member.user.id }` , 60000 )
        if ( st.channel.parentID === pub ) {
            db.add (
                `1public:${ message.author.id }` ,
                60000
            );
        }
        else if ( st.channel.parentID == priv ) {
            db.add ( `1private:${ message.author.id }` , 60000 )
        }
        //else if ( st.channel.parentID == alone ) {
        //    db.add ( `1alone:${ message.author.id }` , new Date //().getTime () - Number ( data.start ) )
        //}
        else if ( st.channel.parentID == game ) {
            db.add ( `1game:${ message.author.id }` , 60000 )
        }
        else if ( st.channel.parentID == vk ) {
            db.add ( `1game:${ message.author.id }` , 60000 )
        }
        else if ( st.channel.parentID == dc ) {
            db.add ( `1game:${ message.author.id }` , 60000 )
        }
        else if ( st.channel.parentID == kayıt ) {
            db.add ( `1kayıt:${ message.author.id }` , 60000 )
        }
        else if ( st.channel.parentID == sorun ) {
            db.add ( `1mod:${ message.author.id }` , 60000 )
        }
        else if ( st.channel.parentID == terapi ) {
            db.add ( `1mod:${ message.author.id }` , 60000 )
        }
        */
    }
} );

//-----------------------------------------------------------------------------------------------------------------------------------\\



//-----------------------------------------------------------------------------------------------------------------------------------\\

client.on ( "message" , async msg => {
    if (msg.channel.type == "dm") return;
  if (msg.author.bot) return;
  if (!msg.guild) return;
  if (msg.member.id==msg.guild.me.id) return;

  if(msg.guild.id != hyperdcid) 
      return

    let argumanlar = msg.content.replace(/ +(?= )/g,'').split(' ');


    if ( argumanlar[0]=="!istatistik" || argumanlar[0]=="!istatistikler" || argumanlar[0]=="!istatistiklerim" ) {
        if ( msg.author.bot ) return;

        var user = msg.mentions.users.first ();
        if(user)
        {
          if(!msg.member.roles.cache.has("927089661271212143") && !msg.member.hasPermission('ADMINISTRATOR'))
           return msg.channel.send("Başkalarının istatistiklerine bakabilmen için gerekli yetkin bulunmuyor.")
        }
        user = user ? user : msg.author;

        let member = msg.guild.members.cache.get ( user.id )
        let st = member.voice
        var data1 = await db.fetch ( `1data1:${ user.id }:${ st.channelID }` );
        if ( data1 ) {
            /*var total = (
                            await db.fetch (
                                `1total:${ user.id }:${ data1.channel }`
                            )
                        ) || { "total" : 0 };
            const json = {
                "channel" : data1.channel ,
                "total" : Number ( total.total ) + (
                    Date.now () - Number ( data1.start )
                )
            };
            db.set ( `1total:${ user.id }:${ data1.channel }` , json );*/
            /*db.delete ( `1data:${ user.id }:${ st.channelID }` );
            const json2 = {
                "channel" : st.channelID ,
                "start" : Date.now ()
            };
            db.set ( `1data:${ user.id }:${ st.channelID }` , json2 );
            if ( st.channel.parentID === pub ) {
                db.add (
                    `1public:${ user.id }` ,
                    new Date ().getTime () - Number ( data1.start )
                );
            }
            else if ( st.channel.parentID == priv ) {
                db.add ( `1private:${ member.user.id }` , 60000 )
            }
            //else if ( st.channel.parentID == alone ) {
            //    db.add ( `1alone:${ member.user.id }` , new Date //().getTime () - Number ( data.start ) )
            //}
            else if ( st.channel.parentID == game ) {
                db.add ( `1game:${ member.user.id }` , 60000 )
            }
            else if ( st.channel.parentID == vk ) {
                db.add ( `1game:${ member.user.id }` , 60000 )
            }
            else if ( st.channel.parentID == dc ) {
                db.add ( `1game:${ member.user.id }` , 60000 )
            }
            else if ( st.channel.parentID == kayıt ) {
                db.add ( `1kayıt:${ member.user.id }` , 60000 )
            }
            else if ( st.channel.parentID == sorun ) {
                db.add ( `1mod:${ member.user.id }` , 60000 )
            }
            else if ( st.channel.parentID == terapi ) {
                db.add ( `1mod:${ member.user.id }` , 60000 )
            }
            */
        }
        let data = await db
            .all ()
            .filter ( x => x.ID.startsWith ( `1total:${ user.id }` ) )
            .sort ( function ( a , b ) {
                return JSON.parse ( b.data ).total - JSON.parse ( a.data ).total;
            } );

//-----------------------------------------------------------------------------------------------------------------------------------\\


//-----------------------------------------------------------------------------------------------------------------------------------\\

        let ses = await db.fetch ( `1public:${ user.id }` ) || 0
        let priv1 = await db.fetch ( `1private:${ user.id }` ) || 0
        let kayıt1 = await db.fetch ( `1kayıt:${ user.id }` ) || 0
        let game1 = await db.fetch ( `1game:${ user.id }` ) || 0
        //let alone1 = await db.fetch ( `1alone:${ user.id }` ) || 0
        let mod1 = await db.fetch ( `1mod:${ user.id }` ) || 0
        let format = moment.duration ( ses ).format ( "h [saat] m [dakika.]" );
        let toplamPriv = moment.duration ( priv1 ).format ( "h [saat] m [dakika.]" );
        let toplamKayıt = moment.duration ( kayıt1 ).format ( "h [saat] m [dakika.]" );
        let toplamGame = moment.duration ( game1 ).format ( "h [saat] m [dakika.]" );
        //let toplamAlone = moment.duration ( alone1 ).format ( "h [saat] m [dakika.]" );
        let toplamMod = moment.duration ( mod1 ).format ( "h [saat] m [dakika.]" );
        let sayi = data.length;
        var isimler = [];
        data.length = 10;
        var i = 0;
        let arr = [];
        for ( i in data ) {
            arr.push ( Number ( JSON.parse ( data[ i ].data ).total ) );
            isimler.push (
                `<#${ JSON.parse ( data[ i ].data ).channel }>: \`${ moment
                    .duration ( Number ( JSON.parse ( data[ i ].data ).total ) )
                    .format ( "h [saat] m [dakika.]" )}\``
            );
        }
        var textDatas = db
            .all ()
            .filter ( x => x.ID.startsWith ( `messageCount:${ user.id }` ) )
            .sort ( function ( a , b ) {
                return JSON.parse ( b.data ).count - JSON.parse ( a.data ).count;
            } );
        var textTotal = (
                            await db.fetch ( `totalMessage:${ user.id }` )
                        ) || 0;
        textDatas.length = 5;
        var liste = "";
        var i = 0;
        for ( i in textDatas ) {
            liste += `<#${ JSON.parse ( textDatas[ i ].data ).channel }>: \`${
                JSON.parse ( textDatas[ i ].data ).count
            } mesaj\`\n`;
        }

        let data2 = await db
            .all ()
            .filter ( x => x.ID.startsWith ( `1total:${ user.id }` ) )
            .sort ( function ( a , b ) {
                return JSON.parse ( b.data ).total - JSON.parse ( a.data ).total;
            } );
        let uw = 0
        let array = []
        for ( uw in data2 ) {
            array.push ( Number ( JSON.parse ( data2[ uw ].data ).total ) );
        }
        /*let toplam = moment
            .duration ( array.reduce ( ( a , b ) => a + b , 0 ) )
            .format ( "h [saat] m [dakika.]" );*/

        let toplamsesss = await db.fetch ( `1toplamsessayisi:${user.id}` );

        let toplam = moment
            .duration ( toplamsesss )
            .format ( "h [saat] m [dakika.]" );

        let üye = msg.guild.members.cache.get ( user.id );

        var davetsayisi = await db.fetch ( `1davetsayisi:${ user.id }` ) || 0;

        var kayitsayisi = await db.fetch ( `1kayitsayisi:${ user.id }` ) || 0;

        var klankayitsayisi = await db.fetch ( `1klankayitsayisi:${ user.id }` ) || 0;

        var tarafsizkayitsayisi = await db.fetch ( `1tarafsizkayitsayisi:${ user.id }` ) || 0;

        var allykayitsayisi = await db.fetch ( `1allykayitsayisi:${ user.id }` ) || 0;

        var ozeluyekayitsayisi = await db.fetch ( `1ozeluyekayitsayisi:${ user.id }` ) || 0;

        const embed = new Discord.MessageEmbed ()

//-----------------------------------------------------------------------------------------------------------------------------------\\


//-----------------------------------------------------------------------------------------------------------------------------------\\

            .setAuthor ( user.tag , user.avatarURL ( { "dynamic" : true } ) )
            .setFooter('HypeR')
            .setTimestamp()
            .setColor ( "RANDOM" )
            .setThumbnail ( user.avatarURL ( { "dynamic" : true } ) )
            .setColor ( "RANDOM" ).setDescription ( `${ üye } (${
                üye.roles.highest
            }) Rolüne sahip kişinin sunucudaki istatistikleri
───────────────
**➥ Sesli Sohbet Bilgileri:** (Toplam: ${toplam.split("0").join(".0.").split("1").join(".1.").split("2").join(".2.").split("3").join(".3.").split("4").join(".4.").split("5").join(".5.").split("6").join(".6.").split("7").join(".7.").split("8").join(".8.").split("9").join(".9.").split(".0.").join("<a:say_0:875469838326321154>").split(".1.").join("<a:say_1:875469865857724456>").split(".2.").join("<a:say_2:875469893577895977>").split(".3.").join("<a:say_3:875469924494082049>").split(".4.").join("<a:say_4:875469952675614850>").split(".5.").join("<a:say_5:875469994652237895>").split(".6.").join("<a:say_6:875470020862423111>").split(".7.").join("<a:say_7:875470046628053042>").split(".8.").join("<a:say_8:875470073760993310>").split(".9.").join("<a:say_9:875470099086209024>")})
${ isimler.join ( "\n" ) }
───────────────
**➥ Mesaj Bilgileri:** (Toplam: ${ textTotal.toString().split("0").join(".0.").split("1").join(".1.").split("2").join(".2.").split("3").join(".3.").split("4").join(".4.").split("5").join(".5.").split("6").join(".6.").split("7").join(".7.").split("8").join(".8.").split("9").join(".9.").split(".0.").join("<a:say_0:875469838326321154>").split(".1.").join("<a:say_1:875469865857724456>").split(".2.").join("<a:say_2:875469893577895977>").split(".3.").join("<a:say_3:875469924494082049>").split(".4.").join("<a:say_4:875469952675614850>").split(".5.").join("<a:say_5:875469994652237895>").split(".6.").join("<a:say_6:875470020862423111>").split(".7.").join("<a:say_7:875470046628053042>").split(".8.").join("<a:say_8:875470073760993310>").split(".9.").join("<a:say_9:875470099086209024>") } mesaj)
${ liste.slice(0, -1) }
───────────────
**➥ Davet ve Kayıt İstatistikleri:**
• Davet: ${davetsayisi.toString().split("0").join(".0.").split("1").join(".1.").split("2").join(".2.").split("3").join(".3.").split("4").join(".4.").split("5").join(".5.").split("6").join(".6.").split("7").join(".7.").split("8").join(".8.").split("9").join(".9.").split(".0.").join("<a:say_0:875469838326321154>").split(".1.").join("<a:say_1:875469865857724456>").split(".2.").join("<a:say_2:875469893577895977>").split(".3.").join("<a:say_3:875469924494082049>").split(".4.").join("<a:say_4:875469952675614850>").split(".5.").join("<a:say_5:875469994652237895>").split(".6.").join("<a:say_6:875470020862423111>").split(".7.").join("<a:say_7:875470046628053042>").split(".8.").join("<a:say_8:875470073760993310>").split(".9.").join("<a:say_9:875470099086209024>")} kişi 
• Kayıt: ${kayitsayisi.toString().split("0").join(".0.").split("1").join(".1.").split("2").join(".2.").split("3").join(".3.").split("4").join(".4.").split("5").join(".5.").split("6").join(".6.").split("7").join(".7.").split("8").join(".8.").split("9").join(".9.").split(".0.").join("<a:say_0:875469838326321154>").split(".1.").join("<a:say_1:875469865857724456>").split(".2.").join("<a:say_2:875469893577895977>").split(".3.").join("<a:say_3:875469924494082049>").split(".4.").join("<a:say_4:875469952675614850>").split(".5.").join("<a:say_5:875469994652237895>").split(".6.").join("<a:say_6:875470020862423111>").split(".7.").join("<a:say_7:875470046628053042>").split(".8.").join("<a:say_8:875470073760993310>").split(".9.").join("<a:say_9:875470099086209024>")} kişi\n➥Klan Kaydı: \`${klankayitsayisi} kişi\`\n➥Özel Üye Kaydı: \`${ozeluyekayitsayisi} kişi\`\n➥Müttefik Kaydı: \`${allykayitsayisi} kişi\`\n➥Tarafsız Kaydı: \`${tarafsizkayitsayisi} kişi\`

    ` );
        msg.channel.send ( embed );
    }
} );

//-----------------------------------------------------------------------------------------------------------------------------------\\



//-----------------------------------------------------------------------------------------------------------------------------------\\

client.on ( "message" , async msj => {
    if (msj.channel.type == "dm") return;
   if (msj.author.bot) return;
    if (!msj.guild) return;
    if (msj.member.id==msj.guild.me.id) return;

    if(msj.guild.id != hyperdcid) 
      return


    let argumanlar = msj.content.replace(/ +(?= )/g,'').split(' ');

    let member = msj.guild.members.cache.get ( msj.author.id )
    if ( argumanlar[0]!="!sıralama") {
        return;
    }
    let data = await db
        .all ()
        .filter ( x => x.ID.startsWith ( `1total` ) )
        .sort ( function ( a , b ) {
            return JSON.parse ( b.data ).total - JSON.parse ( a.data ).total;
        } );
    var liste = []
    var i = 0;
    for ( i in data ) {
        liste.push ( {
                         "kullanıcı" : data[ i ].ID.split ( ":" )[ 1 ] ,
                         "sure" : JSON.parse ( data[ i ].data ).total
                     } )

    }
    var result = []
    liste.reduce ( function ( res , value ) {
        if ( ! res[ value.kullanıcı ] ) {
            res[ value.kullanıcı ] = { "kullanıcı" : value.kullanıcı , "sure" : 0 };
            result.push ( res[ value.kullanıcı ] )
        }
        res[ value.kullanıcı ].sure += value.sure;
        return res;
    } , {} );
    db.set ( `%tamam${ msj.guild.id }` , result )
    let sos = await db.fetch ( `%tamam${ msj.guild.id }` )
    let uu = sos.sort ( function ( a , b ) {
        return b.sure - a.sure
    } )
    let tiki = 0
    uu.length = 10
    let arrays = []
    let num = 1
    for ( tiki in uu ) {
        arrays.push ( `\`${ num++ }.\` - <@${ uu[ tiki ].kullanıcı }> - **${ moment.duration ( Number ( uu[ tiki ].sure ) ).format ( "h [saat] m [dakika]" ) }**` )
    }
    let mesaj = db.all ().filter ( x => x.ID.startsWith ( `totalMessage` ) ).sort ( function ( a , b ) {
        return b.data - a.data
    } )
    mesaj.length = 10
    let bak = 0
    let sayı = 1
    let aruuy = []
    for ( bak in mesaj ) {
        aruuy.push ( `**${ sayı++ }.** <@${ mesaj[ bak ].ID.split ( ":" )[ 1 ] }> - **${ mesaj[ bak ].data } mesaj**` )
    }

    let sessiralama = db.all ().filter ( x => x.ID.startsWith ( `1toplamsessayisi` ) ).sort ( function ( a , b ) {
        return b.data - a.data
    } )
    let sesttttt = 0
    sessiralama.length = 10
    let sesnamsssd = 1
    let sestarray = []
    for ( sesttttt in sessiralama ) {
        sestarray.push ( `**${ sesnamsssd++ }.** <@${ sessiralama[ sesttttt ].ID.split ( ":" )[ 1 ] }> - **${ Math.round(Number ( sessiralama[ sesttttt ].data/60000 ))  } dakika**` )
    }


    let kanal = db.all ().filter ( x => x.ID.startsWith ( `2channel` ) ).sort ( function ( a , b ) {
        return b.data - a.data
    } )
    let cems = 0
    kanal.length = 5
    let nams = 1
    let arooy = []
    for ( cems in kanal ) {
        arooy.push ( `\`${ nams++ }.\` - <#${ kanal[ cems ].ID.split ( ":" )[ 1 ] }> - \`${ moment.duration ( Number ( kanal[ cems ].data ) ).format ( "h [saat] m [dakika]" ) }\` ` )
    }
    let mesajKanal = db.all ().filter ( x => x.ID.startsWith ( `3mesajKanal` ) ).sort ( function ( a , b ) {
        return b.data - a.data
    } )
    mesajKanal.length = 5
    let toki = 0
    let number = 1
    let arvy = []
    for ( toki in mesajKanal ) {
        arvy.push ( `\`${ number++ }.\` - <#${ mesajKanal[ toki ].ID.split ( ":" )[ 1 ] }> - \`${ mesajKanal[ toki ].data }\`` )
    }
    let publics = db.all ().filter ( x => x.ID.startsWith ( `1public` ) ).sort ( function ( a , b ) {
        return b.data - a.data
    } )
    publics.length = 5
    let tokix = 0
    let numberx = 1
    let arvey = []
    for ( tokix in publics ) {
        arvey.push ( `\`${ numberx++ }.\` - <@${ publics[ tokix ].ID.split ( ":" )[ 1 ] }> - \`${ moment.duration ( Number ( publics[ tokix ].data ) ).format ( "h [saat] m [dakika]" ) }\`` )
    }

//-----------------------------------------------------------------------------------------------------------------------------------\\


//-----------------------------------------------------------------------------------------------------------------------------------\\

    const toplam = new Discord.MessageEmbed ()
        .setAuthor ( "🏆 HypeR Sıralama" ,  msj.guild.iconURL({dynamic : true}))
        .setThumbnail ( "" )
        .setColor ( "RANDOM" )
        .setFooter ( msj.author.tag , msj.author.avatarURL ( { "dynamic" : true } ) )
        .setTimestamp()
        .setDescription ( `
**➥ Ses Kanallarında En Aktif İlk 10 Üye**
${ sestarray.join ( "\n" ) }

**➥ Mesaj Kanallarında En Aktif 10 Üye**
${ aruuy.join ( "\n" ) }

Davet ve kayıt istatistiklerini görmek için ➡️ tuşuna basarak sonraki sayfaya geçin

         ` )
         
    let msg = await msj.channel.send ( toplam )
    msg.react('➡️')

    const collector = msg.createReactionCollector((reaction, user) => user.id == msj.author.id, {
      time: 60000 * 6
  });

  let kayitsiralama = db.all ().filter ( x => x.ID.startsWith ( `1kayitsayisi` ) ).sort ( function ( a , b ) {
        return b.data - a.data
    } )
    let kayittttt = 0
    kayitsiralama.length = 10
    let namsss = 1
    let kayitarray = []
    for ( kayittttt in kayitsiralama ) {
        kayitarray.push ( `**${ namsss++ }.** <@${ kayitsiralama[ kayittttt ].ID.split ( ":" )[ 1 ] }> - **${  Number ( kayitsiralama[ kayittttt ].data )  } kişi** ` )
    }

  let davetsiralama = db.all ().filter ( x => x.ID.startsWith ( `1davetsayisi` ) ).sort ( function ( a , b ) {
        return b.data - a.data
    } )
    let davettttt = 0
    davetsiralama.length = 10
    let namsssd = 1
    let davetarray = []
    for ( davettttt in davetsiralama ) {
        davetarray.push ( `**${ namsssd++ }**. <@${ davetsiralama[ davettttt ].ID.split ( ":" )[ 1 ] }> - **${  Number ( davetsiralama[ davettttt ].data )  } kişi** ` )
    }

  collector.on("end", () => {})
  collector.on("collect", async ({emoji,users}) => {
   if (emoji.name == "➡️") {
     const toplam = new Discord.MessageEmbed ()
        .setAuthor ( "🏆 HypeR Sıralama" ,  msj.guild.iconURL({dynamic : true}))
        .setThumbnail ( "" )
        .setColor ( "RANDOM" )
        .setFooter ( msj.author.tag , msj.author.avatarURL ( { "dynamic" : true } ) )
        .setTimestamp()
        .setDescription ( `
**➥En Çok Davet Yapan 10 Kişi**
${ davetarray.join ( "\n" ) }

**➥En Çok Kayıt Yapan 10 Kişi**
${ kayitarray.join ( "\n" ) }

Sesli ve mesaj kanalları istatistiklerini görmek için ⬅️ tuşuna basarak bir önceki sayfaya dönün
        `)

     msg.edit(toplam)

     msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
     msg.react('⬅️');
   }

    if (emoji.name == "⬅️") {
        const toplam = new Discord.MessageEmbed ()
        .setAuthor ( "🏆 HypeR Sıralama" ,  msj.guild.iconURL({dynamic : true}))
        .setThumbnail ( "" )
        .setColor ( "RANDOM" )
        .setFooter ( msj.author.tag , msj.author.avatarURL ( { "dynamic" : true } ) )
        .setTimestamp()
        .setDescription ( `
**➥ Ses Kanallarında En Aktif İlk 10 Üye**
${ sestarray.join ( "\n" ) }

**➥ Mesaj Kanallarında En Aktif 10 Üye**
${ aruuy.join ( "\n" ) }

Davet ve kayıt istatistiklerini görmek için ➡️ tuşuna basarak sonraki sayfaya geçin

         ` )

      msg.edit(toplam)

     msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
     msg.react('➡️');


    }

  })

    //console.log ( publics )
} )

client.on('guildMemberUpdate', async (oldMember, newMember) => { //Sağ tık Role verildiğinde yapılcaklar
  try{
  var entry = await newMember.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor.id || Date.now()-entry.createdTimestamp > 10000)return;
  var user = entry.executor;
  
    let aktif=0
    let rolbulundu=0

    let enustrol = newMember.guild.roles.cache.find(role => role.name === "💥 | Admin");
    let enaltrol = newMember.guild.roles.cache.find(role => role.name === "🎓 | Deneme Alım Sorumlusu");

    newMember.guild.roles.cache.sort((a, b) => b.position - a.position).forEach(role => {
    
    if (role.id == enustrol.id) aktif = 1; 

    if (aktif==1) {
        if(role.name!="🎥 | Youtuber" && role.name!="🔐" && role.name!="<────•        YETKİLİ ROLLERİ        •────>")
        {
        if (role.id==enaltrol)
         aktif=2

        if(!rolbulundu)
        {

        if(newMember.roles.cache.has(role.id))
        {
          rolbulundu=role.id
        }

        }
        else
          return

        //console.log(role.id) 
        }

    }


    })
    
    if(!oldMember.roles.cache.has(rolbulundu) && newMember.roles.cache.has(rolbulundu))
    {
      db.set(`1gorevverilengun:${ newMember.id }` , new Date().getTime());

      db.set(`1gorevverilenguncakma:${ newMember.id }` , new Date().getTime());

      db.set(`1gorevmesajsayisi:${ newMember.id }` , 0);

      db.set(`1gorevsessayisi:${ newMember.id }` , 0);

      db.set(`1gorevkayitsayisi:${ newMember.id }` , 0);

      db.set(`1gorevdavetsayisi:${ newMember.id }` , 0);

      hyperdb.set(`1gorevverilengun:${ newMember.id }` , new Date().getTime());

      hyperdb.set(`1gorevverilenguncakma:${ newMember.id }` , new Date().getTime());

      hyperdb.set(`1gorevmesajsayisi:${ newMember.id }` , 0);

      hyperdb.set(`1gorevsessayisi:${ newMember.id }` , 0);

      hyperdb.set(`1gorevkayitsayisi:${ newMember.id }` , 0);

      hyperdb.set(`1gorevdavetsayisi:${ newMember.id }` , 0);
      
    }

    aktif=0
    rolbulundu=0

    oldMember.guild.roles.cache.sort((a, b) => b.position - a.position).forEach(role => {
    
    if (role.id == enustrol.id) aktif = 1; 

    if (aktif==1) {
      if(role.name!="🎥 | Youtuber" && role.name!="🔐" && role.name!="<────•        YETKİLİ ROLLERİ        •────>")
        {
        if (role.id==enaltrol)
         aktif=2

        if(!rolbulundu)
        {

        if(oldMember.roles.cache.has(role.id))
        {
          rolbulundu=role.id
        }

        }
        else
          return

        //console.log(role.id) 
        }

    }
    
    })
  
    if(!newMember.roles.cache.has(rolbulundu) && oldMember.roles.cache.has(rolbulundu))
    {
      db.set(`1gorevverilengun:${ newMember.id }` , new Date().getTime());

      db.set(`1gorevverilenguncakma:${ newMember.id }` , new Date().getTime());

      db.set(`1gorevmesajsayisi:${ newMember.id }` , 0);

      db.set(`1gorevsessayisi:${ newMember.id }` , 0);

      db.set(`1gorevkayitsayisi:${ newMember.id }` , 0);

      db.set(`1gorevdavetsayisi:${ newMember.id }` , 0);

      hyperdb.set(`1gorevverilengun:${ newMember.id }` , new Date().getTime());

      hyperdb.set(`1gorevverilenguncakma:${ newMember.id }` , new Date().getTime());

      hyperdb.set(`1gorevmesajsayisi:${ newMember.id }` , 0);

      hyperdb.set(`1gorevsessayisi:${ newMember.id }` , 0);

      hyperdb.set(`1gorevkayitsayisi:${ newMember.id }` , 0);

      hyperdb.set(`1gorevdavetsayisi:${ newMember.id }` , 0);
    }

      
    }          
 catch(err) {
  console.error(err);
}
    
})



//-------------------------------------- TOKEN KISIMI -----------------------------\\

const TOKEN = process.env['TOKEN']
const keepAlive = require("./server");
keepAlive();

client.login(TOKEN)

//-------------------------------------- TOKEN KISIMI -----------------------------\\
