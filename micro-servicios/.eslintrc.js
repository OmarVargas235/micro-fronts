module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'plugin:react/recommended',
		'standard-with-typescript',
		'plugin:react/recommended',
			'standard-with-typescript',
			'plugin:react/jsx-runtime',
			'standard',
			'eslint-config-prettier'
	],
	overrides: [
		{
				files: ['*.ts', '*.tsx'],
				rules: {
					'no-undef': 'off',
				},
			},
	],
	parserOptions: {
		ecmaVersion: 'latest',
			sourceType: 'module',
			project: ['tsconfig.json'],
		tsconfigRootDir: __dirname,
	},
	plugins: [
		'react'
	],
	rules: {
		"@typescript-eslint/consistent-type-assertions": "off",
		"@typescript-eslint/no-explicit-any": "warn"
	},
}
