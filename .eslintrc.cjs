module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},

	plugins: ['react'],
	rules: {
		indent: ['error', 'tab'],
		'react/prop-types': ['off'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'react/react-in-jsx-scope': 'off',
		'no-unused-vars': ['error', { vars: 'all', args: 'none' }],
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};