const { alias } = require('react-app-rewire-alias');

module.exports = function override(config, env){
	alias({
		'@': 'src',
		'@styles': 'src/styles',
		'@components': 'src/components'
	})(config);

	return config;
}