const commando = require('discord.js-commando'); // importing discord.js
const client = new commando.Client();

const ids = require('../ids.json'); // client ids, soundbites, channel ids
const GENERAL_ID = ids.channels[0]["log_channel"];

sleep = (ms) => new Promise(res => setTimeout(res, ms));

client.on('ready', () => { // log in
    client.channels.get(GENERAL_ID).send(`Logged in as ${client.user.tag}!`).then(_ =>
        console.log(`Logged in as ${client.user.tag}!`));
});

client.on('voiceStateUpdate', (_, newMember) => {
    const voiceChannel = newMember.voiceChannel;
    console.log('Voice State Update');
    let user = ids.users.filter(user => user.id === newMember.id)[0]; // may be undefined

    if (user === undefined || voiceChannel === undefined
        || client.voiceConnections.array().includes(voiceChannel.connection)) return; // stop if not
    console.log(newMember.user + 'state updated');

    // TEXT
    client.channels.get(GENERAL_ID).send(newMember.displayName +
        ` ALERT IN VOICE CHANNEL ***<#${voiceChannel.id}>!***`).then(_ =>
        console.log('Message Sent to ' + client.channels.get(GENERAL_ID)));

    // VOICE
    voiceChannel.join().then(connection => { // connect to vc
        console.log('Connection Established to vc ' + voiceChannel.name);

        let dispatcher = connection.playFile(user.path); // play audio
        console.log('Audio Playing in ' + voiceChannel.name);

        dispatcher.on('end', end => { // audio finishes
            console.log('Audio Finished Playing');
            voiceChannel.leave();
        });
    });
});

client.login(process.env.BOT_TOKEN).then(r => { // login with token
});
