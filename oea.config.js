

export default {
	sourceConf: {
		sourcePage: 'src/pages',
		sourceLayout: 'src/layouts',
		rootTemplate: 'src/index.ejs'
	},
	pages: [
		{
			template: 'hello',
			layout: 'common',
			path: 'hello',
			variables: {
				title: 'Hello OEA',
				author: "Kent phung",
				count: 10
			},
		},
		{
			template: 'bye',
			layout: 'common',
			path: 'bye',
			variables: {
				title: 'Bye Page',
			},
		}
	]
};
