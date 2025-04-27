import { readFileSync } from 'fs';
import { compile } from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = path.resolve(__dirname, '..');

/**
 * @typedef {object} Route
 * @property {string} template - The name of the template.
 * @property {boolean} module - Whether the template is a module.
 * @property {string} layout - The layout to use for the template.
 * @property {string} path - The path to the template.
 * @property {object} variables - The variables to pass to the template.
 */

const defaultConfig = {
	sourcePage: 'src/pages',
	sourceLayout: 'src/layouts',
	rootTemplate: 'src/index.ejs'
};

/**
 * Renders a page based on the provided route and configuration.
 *
 * @param {Route} route - The route to render.
 * @param {object} [config] - The configuration object.
 * @param {string} [config.sourcePage='src/pages'] - The source directory for pages.
 * @param {string} [config.sourceLayout='src/layouts'] - The source directory for layouts.
 * @param {string} [config.rootTemplate='src/index.ejs'] - The path to the root template.
 * @returns {Promise<string>} The rendered page as an HTML string.
 * @throws {Error} If there is an error reading the template files or compiling the templates.
 */
async function renderPage(route, config = null) {
	const newConfig = config ?? defaultConfig;

	// Determine the paths to the page, layout, and root templates.
	const pageTemplate = route.module ? `${route.template}/index.ejs` : `${route.template}.ejs`;
	const pagePath = path.join(rootDir, newConfig.sourcePage, pageTemplate);

	const layoutPath = path.join(rootDir, newConfig.sourceLayout, route.layout, 'index.ejs');
	const rootTemplatePath = path.join(rootDir, newConfig.rootTemplate);

	try {
		const pageContent = readFileSync(pagePath, 'utf-8');
		const layoutContent = readFileSync(layoutPath, 'utf-8');
		const rootTemplateContent = readFileSync(rootTemplatePath, 'utf-8');

		const scriptPath = route.module ? `/${route.template}-bundle.js` : `/${route.template}.js`;
		const stylePath = route.style || `/style/${route.template}.css`;

		const page = compile(pageContent, {
			filename: pagePath,
			rmWhitespace: true
		})

		const pageRendered = page({
			...route.variables,
		})

		const layout = compile(layoutContent, {
			filename: layoutPath,
			rmWhitespace: true,
		});

		const layoutRendered = layout({
			content: pageRendered,
			title: route.variables?.title || route.title || '',
			...route.variables,
		});

		const rootTemplate = compile(rootTemplateContent, {
			filename: rootTemplatePath,
			rmWhitespace: true,
		});

		const rendered = rootTemplate({
			page: layoutRendered,
			title: route.variables?.title || route.title || '',
			script: scriptPath,
			style: stylePath,
			...route.variables
		});

		return rendered;
	} catch (error) {
		console.error(`Error rendering page ${route.template}:`, error);
		throw error;
	}
}

/**
 * Generates the entry points for webpack based on the provided routes.
 *
 * @param {Route[]} routes - The routes to generate entry points for.
 * @returns {Promise<object>} The entry points for webpack.
 */
async function generateEntries(routes) {
	const entries = {};

	for (const route of routes) {
		if (route.module) {
			const entryPath = path.join(rootDir, 'src/pages', route.template, 'index.ts');
			entries[route.template] = entryPath;
		}
	}

	return entries;
}

export { renderPage, generateEntries };
