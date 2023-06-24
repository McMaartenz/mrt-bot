import { config } from '../config';
import { translations } from '../translations';

const Messages = translations[config.language];
function Fill(message: string, object: any): string {
	return message.replace('[%s]', object.toString());
}

export { Messages, Fill };
