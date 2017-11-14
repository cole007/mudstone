module.exports = {
	mode: 'html',

	html: {
		task: 'code',
		watch: true,
		extensions: ['twig', 'html', 'json'],
		excludeFolders: [
			'layout',
			'macros',
			'data',
			'partials',
			'modules',
			'wrapper',
			'includes'
		]
	}
}
