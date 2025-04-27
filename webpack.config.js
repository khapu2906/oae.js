import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin'; // Thêm plugin
import routes from './engine/router.js';
import { renderPage, generateEntries } from './engine/render.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createHtmlPlugins() {
	const plugins = [];
	for (const route of routes) {
		try {
			const content = await renderPage(route);
			plugins.push(
				new HtmlWebpackPlugin({
					filename: `${route.path}.html` || `${route.template}.html`,
					templateContent: content,
					inject: false,
				})
			);
		} catch (error) {
			console.error(`Error creating HTML plugin for route ${route.template}:`, error);
		}
	}
	return plugins;
}

export default async () => {
	const routes = (await import('./engine/router.js')).default;
	const htmlPlugins = await createHtmlPlugins();
	const entries = await generateEntries(routes);
	return {
		entry: {
			index: './src/main.ts',
			...entries,
		},
		output: {
			filename: '[name]-bundle.js',
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/',
		},
		resolve: {
			extensions: ['.ts', '.js', '.ejs'],
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.ejs$/,
					type: 'asset/source',
				},
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
					],
				},
				{
					test: /\.js$/,
					use: 'ts-loader',
					exclude: /node_modules/,
					type: 'javascript/auto',
				},
			],
		},
		plugins: [
			...htmlPlugins,
			new MiniCssExtractPlugin({
				filename: 'style/[name].css',
			}),
		],
		devServer: {
			static: {
				directory: path.join(__dirname, 'dist'),
			},
			compress: true,
			port: 3000,
			open: false,
		},
		mode: 'development',
	};
};
