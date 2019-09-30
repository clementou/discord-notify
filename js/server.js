console.log("Startup");

const Commando = require('discord.js-commando'); // importing discord.js
const client = new Commando.Client();

const ids = JSON.parse('../ids.json');
const AUDIOFILE_PATH = './sounds/charlie.mp3';
const CHARLIE_ID = '363180361188114434'; // Charlie ID: 363180361188114434
const LUCAS_ID = '190896840173027330'; // Lucas ID: 190896840173027330
const GENERAL_ID = '252986450386092033';

sleep = (ms) => new Promise(res => setTimeout(res, ms));

client.on('ready', () => {
    client.channels.get(GENERAL_ID).send(`Logged in as ${client.user.tag}!`).then(_ =>
        console.log(`Logged in as ${client.user.tag}!`))
});

client.on('voiceStateUpdate', (_, newMember) => {
    console.log('Voice State Update');
    if (newMember.id !== CHARLIE_ID
        || newMember.voiceChannel === undefined) return;
    console.log('Its Charlie!');

    let voiceChannel = newMember.voiceChannel;

    // TEXT
    client.channels.get(GENERAL_ID).send(`CHARLIE ALERT IN VOICE CHANNEL ***<#${voiceChannel.id}>!***`).then(_ =>
        console.log('Message Sent'));

    // VOICE
    voiceChannel.join().then(connection => {
        console.log('Connection Established');

        let dispatcher = connection.playFile(AUDIOFILE_PATH);
        console.log('Audio Playing');

        dispatcher.on('speaking', (isSpeaking) => {
            if (!isSpeaking) {
                console.log('Audio Finished Playing');
                voiceChannel.leave();
            }
        });
    });
});

client.on('voiceStateUpdate', (_, newMember) => {
    console.log('Voice State Update');
    if (newMember.id !== LUCAS_ID
        || newMember.voiceChannel === undefined) return;
    console.log('Its Lucas!');

    let voiceChannel = newMember.voiceChannel;

// TEXT

    client.channels.get(GENERAL_ID).send(`LUCAS ALERT IN VOICE CHANNEL ***<#${voiceChannel.id}>!***`).then(_ =>
        console.log('Message Sent'));

// VOICE

    voiceChannel.join().then(connection => {
        console.log('Connection Established');

        let dispatcher = connection.playFile(AUDIOFILE_PATH);
        console.log('Audio Playing');

        dispatcher.on('speaking', (isSpeaking) => {
            if (!isSpeaking) {
                console.log('Audio Finished Playing');
                voiceChannel.leave();
            }
        });
    });
});

client.login(process.env.BOT_TOKEN);

