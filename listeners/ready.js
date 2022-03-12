const { Listener } = require('discord-akairo');
const { textSync } = require('figlet');
const { red, yellow, yellowBright } = require('chalk');
const { isEqual }= require('lodash');
const { botstatus } = require('../config');
const { registerCommands, commands, deleteCommands } = require('../slash-setup');
var cron = require("cron");

let globalclient;

function durum1() {

  globalclient.user.setPresence({
    status: 'idle',
    activity: {
        name: 'HypeR İstatistik',
        type: 'WATCHING',
    }
})
 
}

function durum2() {
 
  globalclient.user.setPresence({
    status: 'online',
    activity: {
        name: 'HypeR İstatistik',
        type: 'STREAMING',
        url: "https://www.twitch.tv/hyperklan7",
    }
})
 
}

module.exports = class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    };
    async exec() {
        try{
       
          
        const { client } = this;
        const { guildInvites } = client;
        console.log(yellow(textSync('HypeR', { horizontalLayout: 'full' })));
            
        console.log(red('--------------------\n'
            + `> Kullanıcılar: ${client.users.cache.size}\n`
            + `> Kanallar: ${client.channels.cache.size}\n`
            + `> Serverlar: ${client.guilds.cache.size}`));
        /*client.guilds.cache.forEach(async guild => {
            let invites = await guild.fetchInvites();
            if(guild.vanityURLCode) invites.set(guild.vanityURLCode, await guild.fetchVanityData());
            guildInvites.set(guild.id, invites);
        }); */

  //const channel = client.channels.cache.get("855586490335100939");
  //channel.join();
            
         client.user.setPresence({
    status: 'idle',
    activity: {
        name: 'HypeR İstatistik',
        type: 'WATCHING',
    }
})   
  
 globalclient=client;   
    
 let job1 = new cron.CronJob('00,20,40 * * * * *', durum1); 
 job1.start();
 let job2 = new cron.CronJob('10,30,50 * * * * *', durum2); 
 job2.start();    
          
        if(botstatus.enabled === true) {
            if(botstatus.activity_type.toUpperCase() == 'STREAMING') {
                client.user.setPresence({activity: {name: botstatus.activity_text, type: botstatus.activity_type.toUpperCase(), url: botstatus.activity_url}, status: botstatus.status.toLowerCase() || 'online'});
            } else {
                client.user.setPresence({activity: {name: botstatus.activity_text, type: botstatus.activity_type.toUpperCase()}, status: botstatus.status.toLowerCase() || 'online'});
            };
        };
        let application = await client.fetchApplication();
        if(client.config.welcomeChannel == true) {
            let welcomeChannel = await client.channels.fetch(client.config.welcomeChannel);
            if(!welcomeChannel.permissionsFor(welcomeChannel.guild.me).has('SEND_MESSAGES')) {
                try {
                    application.owner.send('I do not have permission to send messages in the welcome channel you have inputted. Please provide me permissions to do so.');
                } catch (error) {};
            };
        };
        let alreadyRegistered = await client.api.applications(application.id).commands.get();
        if(client.config.slashCommands && !isEqual(alreadyRegistered.map(command => command.name), commands.map(command => command.name))) registerCommands(client);
        if(client.config.slashCommands === false && alreadyRegistered) deleteCommands(client)
        if(client.guilds.cache.size == 0) {
            let invite = await client.generateInvite({permissions: ["MANAGE_GUILD", "VIEW_CHANNEL", "SEND_MESSAGES", "ADMINISTRATOR"]})
            if(client.config.slashCommands) invite += "%20applications.commands"
            console.log(yellowBright(`It seems like I am not in any servers! Please invite me to a server using this link!\n`) + invite)
        }
            
            }          
 catch(err) {
  console.error(err);
}
        
    };
};
