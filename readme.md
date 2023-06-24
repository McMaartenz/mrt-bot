config.ts expects:
```ts
const config =
{
	prefix: '$',
	token: 'your-bot-token',
	superusers: ['user-id'],
	language: 'zh-CN', /* or nl-NL, en-US */
	blacklist: {
		users: ['user-id-to-block'],
		words: [/k(a?n)?ke?r?/] /* Regex */
	}
};

export { config };
```
