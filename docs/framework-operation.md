# Framework Operation

The framework operates by reading route definitions from `engine/router.js`, rendering pages using templates in `src/pages` and layouts in `src/layouts`, and using `webpack` to bundle the code and generate HTML files in the `dist` directory.

The `engine/render.js` file contains the `renderPage` function, which is responsible for rendering a single page based on a route definition. It reads the page template, layout template, and root template, compiles them using `ejs`, and combines them to produce the final HTML output.

The `webpack.config.js` file configures `webpack` to bundle the code and generate HTML files. It uses the `html-webpack-plugin` to generate HTML files from the templates and the `mini-css-extract-plugin` to extract CSS from the JavaScript code.

The `src/index.ejs` file is the root template file. It defines the basic HTML structure of the application.

The `src/layouts` directory contains layout templates. Layout templates define the overall structure of a page, such as the header, footer, and navigation.

The `src/pages` directory contains the page templates. Page templates define the content of a specific page.
