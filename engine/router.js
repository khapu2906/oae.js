
const routes = [
	{
		template: 'hello',
		module: true,
		layout: 'common',
		path: 'hello/test',
		variables: {
			title: 'Hello Page',
			name: "Hoang",
			count: 10
		},
	},
	{
		template: 'bye',
		module: true,
		layout: 'common',
		path: 'bye',
		variables: {
			title: 'Bye Page',
		},
	},
	{
		template: 'about',
		module: true,
		layout: 'common',
		path: 'index',
		variables: {
			title: 'About Page',
		},
	},
];

export default routes;
