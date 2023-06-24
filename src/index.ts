import { Client, Events, GatewayIntentBits, Message, User } from 'discord.js';
import { config } from '../config';
import { Command, Commands } from './command';
import { Fill, Messages } from './language';

// Events
const EVT_MSG_CREATE = 'messageCreate';

const log = (msg: any) => {
	console.log(new Date(), msg);
}

const client = new Client({
intents: [
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.Guilds,
	GatewayIntentBits.MessageContent
]});

client.once(Events.ClientReady, c => {
	log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(config.token);

client.on(EVT_MSG_CREATE, (msg: Message<boolean>): void => {
	if (msg.author.bot) {
		return;
	}

	if (msg.guild == null) {
		return;
	}

	if (msg.author.id in config.blacklist.users) {
		return;
	}

	if (!msg.content.startsWith(config.prefix)) {
		checkBlacklist(msg);
		return;
	}

	const cmd = new Command(msg);
	if (!cmd.authorized) {
		msg.reply(Messages.Unauthorized);
		return;
	}

	if (!cmd.valid) {
		msg.reply(Messages.InvalidArgs);
		return;
	}

	execute(cmd);
});

function checkBlacklist(msg: Message<boolean>): void {
	for (const word of config.blacklist.words) {
		if (msg.content.match(word) && msg.deletable) {
			msg.reply(Messages.BadLanguage)
				.then(_ => msg.delete());
		}
	}
}

function execute(cmd: Command): void {
	const m = cmd.message;
	switch (cmd.type) {
		case Commands.Ping: {
			m.reply(Messages.PongCalculating).then(async (reply) => {
				const latency = reply.createdTimestamp - m.createdTimestamp;
				reply.edit(Fill(Messages.Pong, latency));
			});
			break;
		}

		default: {
			log(`Command ${Commands[cmd.type]} is not implemented`);
			break;
		}
	}	
}

export { log };
