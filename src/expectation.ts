import { PermissionResolvable } from 'discord.js';
import { Commands } from './command';

type Expectation = {
	argc: number | number[],
	perms: PermissionResolvable,
};

const expects: Record<string, Expectation> = {
	'Invalid': {
		argc: 0,
		perms: []
	},
	'Help': {
		argc: [0, 1],
		perms: []
	},
	'Ping': {
		argc: 0,
		perms: []
	},
};

export { Expectation, expects };
