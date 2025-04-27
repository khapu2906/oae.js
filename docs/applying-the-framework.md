# Applying the Framework

This document provides a guide on how to apply the framework to create new web pages and applications.

## Applying the Framework

Since this framework uses EJS templates, you can apply the framework by creating new pages and passing data to them.

1.  Create a new page in `src/pages`.
2.  Add a route in `engine/router.js` that points to the new page.
3.  Pass data to the page through the `variables` property in the route definition.

For example, to create a new page called `my-page` that displays a title and a message, you would do the following:

1.  Create a new file called `src/pages/my-page/index.ejs` with the following content:

```html
<h1><%= title %></h1>
<p><%= message %></p>
```

2.  Add a new route to `engine/router.js` with the following content:

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
},
```

3.  Run `npm run build` to generate the new page.

You can then access the new page by navigating to `/my-page.html` in your browser.
