console.log("Startup");

const commando = require('discord.js-commando'); // importing discord.js
const client = new commando.Client();

const ids = require('../ids.json');
const GENERAL_ID = ids.channels[0]["log_channel"];

sleep = (ms) => new Promise(res => setTimeout(res, ms));

client.on('ready', () => {
    client.channels.get(GENERAL_ID).send(`Logged in as ${client.user.tag}!`).then(_ =>
        console.log(`Logged in as ${client.user.tag}!`))
});

let isReady = true;
client.on('voiceStateUpdate', (_, newMember) => {
    console.log('Voice State Update');
    let user = ids.users.filter(user => user.id === newMember.id)[0]; // may be undefined

    if (user === undefined || newMember.voiceChannel === undefined || !isReady) return; // stop if not
    console.log(newMember.user + 'state updated');

    // TEXT
    client.channels.get(GENERAL_ID).send(newMember.displayName +
        ` ALERT IN VOICE CHANNEL ***<#${newMember.voiceChannel.id}>!***`).then(_ =>
        console.log('Message Sent to ' + client.channels.get(GENERAL_ID)));

    // VOICE
    newMember.voiceChannel.join().then(connection => {
        console.log('Connection Established to vc ' + newMember.voiceChannel.name);

        let dispatcher = connection.playFile(user.path);
        console.log('Audio Playing in ' + newMember.voiceChannel.name);
        isReady = false;

        dispatcher.on('end', end => {
            console.log('Audio Finished Playing');
            isReady = true;
            newMember.voiceChannel.leave();
        });
    });
});

client.login(process.env.BOT_TOKEN).then(r => {
});
