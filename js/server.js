console.log("Startup");

const Commando = require('discord.js-commando');
let bot = new Commando.Client();
const AUDIOFILE_PATH = './sounds/charlie.mp3';
const CHARLIE_ID = '171336809836576768'; // Charlie ID: 363180361188114434
const LUCAS_ID = '190896840173027330'; // Lucas ID: 190896840173027330
const GENERAL_ID = '252986450386092033';

sleep = (ms) => new Promise(res => setTimeout(res, ms));

bot.on('ready', () => {
    bot.channels.get(GENERAL_ID).send(`Logged in as ${bot.user.tag}!`).then(_ =>
        console.log(`Logged in as ${bot.user.tag}!`))
});

bot.on('voiceStateUpdate', (_, newMember) => {
    console.log('Voice State Update');
    if (newMember.id !== CHARLIE_ID
        || newMember.voiceChannel === undefined) return;
    console.log('Its Charlie!');

    let voiceChannel = newMember.voiceChannel;

    // TEXT
    bot.channels.get(GENERAL_ID).send(`CHARLIE ALERT IN VOICE CHANNEL ***<#${voiceChannel.id}>!***`).then(_ =>
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

bot.on('voiceStateUpdate', (_, newMember) => {
    console.log('Voice State Update');
    if (newMember.id !== LUCAS_ID
        || newMember.voiceChannel === undefined) return;
    console.log('Its Lucas!');

    let voiceChannel = newMember.voiceChannel;

// TEXT

    bot.channels.get(GENERAL_ID).send(`LUCAS ALERT IN VOICE CHANNEL ***<#${voiceChannel.id}>!***`).then(_ =>
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

const fs = require('fs');
fs.readFile('token', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log('Logging in with ' + data);
    bot.login(data);
});

