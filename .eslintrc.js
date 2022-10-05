module.exports = {
	extends: [
		'53js',
	],
	env: {
		browser: true,
	},
	rules: {
		// ici on peut surcharger les règles
		// exemple de rules
		'no-console': 1,
		// 0 <=> off
		// 1 <=> warn
		// 2 <=> error
		// doc : https://eslint.org/docs/rules/
	},
};
