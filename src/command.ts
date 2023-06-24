import { Message, User } from "discord.js";
import { config } from "../config";
import { Expectation, expects } from "./expectation";
import { log } from './index';

enum Commands {
	Invalid,
	Help,
	Ping
}

const conversion: { [key: string]: Commands } = {
	'ping': Commands.Ping,
	'help': Commands.Help,
};

class Command {
	public type: Commands;
	public message: Message<boolean>;
	public args: string[] = [];
	public authorized: boolean;
	public valid: boolean;
	public expectation: Expectation;

	constructor (message: Message<boolean>) {
		this.message = message;
		this.type = this.getType();
		this.expectation = expects[Commands[this.type]];
		this.authorized = this.isAuthorized();
		this.valid = this.checkExpects();
	}

	private checkExpects(): boolean {
		if (!this.authorized) {
			log(`${this.message.author.id} (${this.message.author.username}) tried to execute ${Commands[this.type]}`);
			return false;
		}

		const argc = this.expectation.argc;
		if (typeof argc == 'number') {
			return this.args.length == argc;
		}
		
		return this.args.length in (argc as number[]);
	}

	private getType(): Commands {
		const split = this.getArgs();
		const name = split.shift()?.toLowerCase();
		this.args = split;

		if (name == undefined || !conversion.hasOwnProperty(name)) {
			return Commands.Invalid;
		}

		return conversion[name];
	}

	private getArgs(): string[] {
		const split = this.message.content
			.substring(config.prefix.length)
			.split(' ');

		return split;
	}
	
	private isAuthorized(): boolean {
		if (this.message.author.id in config.superusers ||
			this.expectation.perms == 0n) { /* 0n: no perms */
			return true;
		}

		if (this.message.member == null) {
			return false;
		}

		return this.message.member.permissions
			.has(this.expectation.perms);
	}
}

export { Commands, Command };
