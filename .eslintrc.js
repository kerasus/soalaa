module.exports = {
  env: {
		node: true,
		commonjs: true
  },
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module',
		allowImportExportEverywhere: true
	},
  extends: [
		// add more generic rulesets here, such as:
		'eslint:recommended',
		// 'plugin:vue/vue3-recommended',
		'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  rules: {
		"no-mixed-spaces-and-tabs": [2, "smart-tabs"]
		// override/add rules settings here, such as:
		// 'vue/no-unused-vars': 'error'
  }
}
