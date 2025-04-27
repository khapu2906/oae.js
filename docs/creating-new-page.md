# Creating a New Page

This document provides a step-by-step guide on how to create a new page in the framework.

## Steps

1.  **Create a new page file:** Create a new directory and files in the `src/pages` directory. For example, `src/pages/my-page/index.ejs` and `src/pages/my-page/index.ts`.
    *   The `index.ejs` file will contain the HTML markup for your page. You can use EJS syntax to inject data into the template.
    *   The `index.ts` file is optional and will contain any JavaScript or TypeScript code for your page.
2.  **Create a new layout file (optional):** If you want to use a custom layout, create a new file in the `src/layouts` directory. A layout file defines the overall structure of your page, such as the header, footer, and navigation.
3.  **Add a new route to `engine/router.js`:** Add a new entry to the `routes` array in the `engine/router.js` file. This entry will define the URL for your page and the template to use. The route object should have the following properties:
    *   `template`: The name of the template (e.g., `my-page`). This should match the name of the directory you created in the `src/pages` directory.
    *   `module`: Whether the template is a module (boolean). Set this to `true` if you have a corresponding `index.ts` file for your page.
    *   `layout`: The layout to use for the template (string). This should match the name of the layout file you created in the `src/layouts` directory, or `common` if you want to use the default layout.
    *   `path`: The path to the template (string). This defines the URL for your page (e.g., `my-page`).
    *   `variables`: An object containing the variables to pass to the template (object). These variables will be available in your `index.ejs` file.
4.  **Build the project:** Run `npm run build` to generate the new page. This will create a new HTML file in the `dist` directory for your page.

## Example

To create a new page called "my-page" with the title "My Page" and the message "Hello, world!", you would do the following:

1.  Create a new directory called `src/pages/my-page`.
2.  Create a new file called `src/pages/my-page/index.ejs` with the following content:

```html
<h1><%= title %></h1>
<p><%= message %></p>
```

3.  Create a new file called `src/pages/my-page/index.ts` with the following content:

```typescript
export default {};
```

4.  Add the following route to `engine/router.js`:

```javascript
{
    template: 'my-page',
    module: true,
    layout: 'common',
    path: 'my-page',
    variables: {
        title: 'My Page',
        message: 'Hello, world!'
    },
}
```

5.  Run `npm run build`.

You can then access the new page by navigating to `http://localhost:3000/my-page.html` in your browser.
