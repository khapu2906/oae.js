import { readFileSync } from 'fs';
import { compile } from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Đường dẫn tới thư mục gốc của dự án
const rootDir = path.resolve(__dirname, '..');

const defaultConfig = {
	sourcePage: 'src/pages',
	sourceLayout: 'src/layouts',
	rootTemplate: 'src/index.ejs'
};

async function renderPage(route, config = null) {
	const newConfig = config ?? defaultConfig;

	// 1. Xác định đường dẫn đến các file template
	const pageTemplate = route.module ? `${route.template}/index.ejs` : `${route.template}.ejs`;
	const pagePath = path.join(rootDir, newConfig.sourcePage, pageTemplate);

	const layoutPath = path.join(rootDir, newConfig.sourceLayout, route.layout, 'index.ejs');
	const rootTemplatePath = path.join(rootDir, newConfig.rootTemplate);

	try {
		// 2. Đọc nội dung các file
		const pageContent = readFileSync(pagePath, 'utf-8');
		const layoutContent = readFileSync(layoutPath, 'utf-8');
		const rootTemplateContent = readFileSync(rootTemplatePath, 'utf-8');

		// 3. Script path và style path
		const scriptPath = route.module ? `/${route.template}-bundle.js` : `/${route.template}.js`;
		const stylePath = route.style || `/style/${route.template}.css`;

		const page = compile(pageContent, {
			filename: pagePath,
			rmWhitespace: true
		})

		const pageRendered = page({
			...route.variables,
		})

		// 4. Render page vào layout
		const layout = compile(layoutContent, {
			filename: layoutPath,
			rmWhitespace: true,
		});

		const layoutRendered = layout({
			content: pageRendered,  // Trong layout common/index.ejs sử dụng biến 'content'
			title: route.variables?.title || route.title || '',
			...route.variables,
		});

		// 5. Render layout đã có page vào root template
		const rootTemplate = compile(rootTemplateContent, {
			filename: rootTemplatePath,
			rmWhitespace: true,
		});

		const rendered = rootTemplate({
			page: layoutRendered,  // Trong src/index.ejs sử dụng biến 'page'
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

// Function để tạo các entry points cho webpack
async function generateEntries(routes) {
	const entries = {};

	for (const route of routes) {
		if (route.module) {
			// Nếu route là module, thêm entry point cho nó
			const entryPath = path.join(rootDir, 'src/pages', route.template, 'index.ts');
			entries[route.template] = entryPath;
		}
	}

	return entries;
}

export { renderPage, generateEntries };