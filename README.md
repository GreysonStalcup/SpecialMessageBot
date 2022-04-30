# Special Message Bot

## About this Bot

Welcome to special message bot!  

This bot will send anyone that joins a specified Voice Chat a message at random of its choosing from a list of phrases you make. It can be a positivy bot, or a bot to be as "Creative" as you wish.

# Logic

- [voiceStateUpdate](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-voiceStateUpdate) → This is called whenever a user joins any channel
    - On any user joining a channel, check if the specific voice channel is full.
        - VoiceChannel.full returns true or false. If one member is in the voice channel, this will be true if there are 1/1 slots taken.  Therefore, this will be true.
    - After determining if this is true or false, we can then get the user that is in the voice channel.
        - VoiceChannel****[.members](https://discord.js.org/#/docs/discord.js/stable/class/VoiceChannel?scrollTo=members) →** This returns a “Snowflake”(or Unique ID basically), and the GuildMember.  GUILD == Server, Guild MEMBER == server member.
    - Then, GuildMember.createDM() can be used to send a message to the member.
    - then kick them from VC ← this is important part


## TODO 

[x]Get bot account registered  
[x]Add bot to server  
[x]kick player when they join specified channel  
[x]send player random message from insult list
[x]make bot standalone
[  ]add functionality....not sure what yet