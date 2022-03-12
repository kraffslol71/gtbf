const { Listener } = require('discord-akairo');
module.exports = class InviteDeleteListener extends Listener {
    constructor() {
        super('inviteDelete', {
            emitter: 'client',
            event: 'inviteDelete'
        });
    };
    async exec(invite) {
        try {
            
        this.client.guildInvites.set(invite.guild.id, await invite.guild.fetchInvites());
            
            }          
 catch(err) {
  console.error(err);
}
        
    };
};
