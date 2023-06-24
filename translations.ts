const translations: Record<string, Record<string, string>> = {
	'en-US': {
		'Unauthorized': 'You are unauthorized to perform this action',
		'InvalidArgs': 'Invalid amount of arguments',
		'BadLanguage': 'Watch your language',
		'PongCalculating': 'Pong! calculating..',
		'Pong': 'Pong! [%s]ms'
	},
	'nl-NL': {
		'Unauthorized': 'Jij mag deze actie niet uitvoeren',
		'InvalidArgs': 'Ongeldig aantal opties',
		'BadLanguage': 'Niet schelden hier',
		'PongCalculating': 'Pong! berekenen..',
		'Pong': 'Pong! [%s]ms'
	},
	'zh-CN': {
		'Unauthorized': '您沒有许可',
		'InvalidArgs': '实参的量无效',
		'BadLanguage': '别骂',
		'PongCalculating': '乓! 正在计量..',
		'Pong': '乓! [%s]毫秒'
	}
};

export { translations };
