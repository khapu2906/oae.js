
/**
 * @typedef {object} Route
 * @property {string} template - The name of the template.
 * @property {boolean} module - Whether the template is a module.
 * @property {string} layout - The layout to use for the template.
 * @property {string} path - The path to the template.
 * @property {object} variables - The variables to pass to the template.
 */

const routes = [
	{
		template: 'hello',
		module: true,
		layout: 'common',
		path: 'index',
		variables: {
			title: 'Hello OEA',
			author: "Kent phung",
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
	}
];

export default routes;
