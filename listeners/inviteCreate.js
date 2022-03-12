const { Listener } = require('discord-akairo');
module.exports = class InviteCreateListener extends Listener {
    constructor() {
        super('inviteCreate', {
            emitter: 'client',
            event: 'inviteCreate'
        });
    };
    async exec(invite) {
        try{
        
        this.client.guildInvites.set(invite.guild.id, await invite.guild.fetchInvites());
            
            }          
 catch(err) {
  console.error(err);
}
        
    };
};
