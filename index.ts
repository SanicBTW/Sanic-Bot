//#region Imports
import Discord, { Intents } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
var client:Discord.Client = new Discord.Client({intents: Intents.FLAGS.GUILDS})!;
import { token } from './src/Config/Secrets.json';
import DiscordSettings from './src/Config/DiscordConfig.json';
import { Refresh } from './src/SlashReg';
import * as readline from 'readline';
import { Logger } from './src/Logger';
import Versions from './src/Data/Version.json';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> "
});
import {InitConsoleCommands} from './src/TerminalHelper/Commands';
import {InitFunctions} from './src/TerminalHelper/ConfigFunctions';
//#endregion

client.on('ready', async () => {
    await Refresh().then(async () => {
        await InitFunctions().then(() => {
            Logger(`Logged in as ${client.user?.tag}`, 'INFO');
            /*
            client.user?.setPresence({ status: "dnd",
            activity: {
                name: Versions.DiscordBotVer
            }});*/
            InitConsoleCommands(client, rl);
        })    
    })
});

client.on('interactionCreate', async(interaction) => {
    if(!interaction.isCommand()) return;

    if(interaction.commandName === 'ping') {
        const pingypingy:any = new Discord.MessageEmbed()
        .setTitle('Pong! :ping_pong:')
        .addFields
        (
            { name: 'Ping del bot ', value: `${client.ws.ping}ms`, inline: true}
        ).setColor('#008000');

        await interaction.reply({embeds: [pingypingy], ephemeral:true})
    } else if (interaction.commandName === 'apagar') {
    }
})

client.login(token);