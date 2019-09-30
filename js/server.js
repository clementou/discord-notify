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

client.on('voiceStateUpdate', (_, newMember) => {
    console.log('Voice State Update');
    let id_exists = false;
    let index = '';
    for (let i = 0; i < ids.users.length; i++) // check if newMember in json
        if (ids.users[i].id === newMember.id) {
            id_exists = true;
            index = i;
        }
    if (!id_exists || newMember.voiceChannel === undefined) return; // stop if not
    console.log(newMember.user + 'state updated');

    // TEXT
    client.channels.get(GENERAL_ID).send(newMember.nickname +
        ` ALERT IN VOICE CHANNEL ***<#${newMember.voiceChannel.id}>!***`).then(_ =>
        console.log('Message Sent to ' + client.channels.get(GENERAL_ID)));

    // VOICE
    newMember.voiceChannel.join().then(connection => {
        console.log('Connection Established to vc ' + newMember.voiceChannel.name);

        let dispatcher = connection.playFile(ids.users[index].path);
        console.log('Audio Playing in ' + newMember.voiceChannel.name);

        dispatcher.on('speaking', (isSpeaking) => {
            if (!isSpeaking) {
                console.log('Audio Finished Playing');
                newMember.voiceChannel.leave();
            }
        });
    });
});

client.login(process.env.BOT_TOKEN).then(r => {
});
