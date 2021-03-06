module.exports = Kirbi => {
	const servers = Kirbi.getJsonObject('/config/servers.json');
	return {
		commands: [
			'server'
		],
		server: {
			usage: `list|${servers.map(server => server.key).join('|')}`,
			process: (msg, suffix, isEdit, cb) => {
				if (suffix.toLowerCase() === 'list' || suffix.trim() === '') {
					cb({
						embed: {
							title: `${Kirbi.Config.discord.serverName} Servers`,
							description: servers.map(server => server.key).sort().join('\n'),
							color: Kirbi.Config.discord.defaultEmbedColor
						}
					}, msg);
				} else {
					const info = servers.filter(server => server.key === suffix.toLowerCase())[0];
					if (info) {
						cb({
							embed: {
								title: info.title,
								description: info.description,
								color: Kirbi.Config.discord.defaultEmbedColor
							}
						}, msg);
					}
				}
			}
		}
	};
};
