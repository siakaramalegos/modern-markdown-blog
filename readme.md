# Modern Markdown Blog

This is a markdown blog starter with a modern build process to create super-fast website with as little JavaScript as possible. Think of it like Jekyll + webpack.

The goals:
- Compile to static pages with no backend.
- Write blog posts in markdown because it's more fun.
- Automatically generate the blog post pages.
- Automatically generate the blog post index page.
- Use as little runtime JavaScript as possible (preferably none).
- Make it as fast as possible (e.g., automatically generate responsive images and perhaps webp formats too)
- Learn new things as I build.

You can view a deployed sample [here](https://siakaramalegos.github.io/modern-markdown-blog/).

## Primary Dependencies

- [Embedded JavaScript templates (ejs)](https://github.com/mde/ejs)
- [Remarkable](https://github.com/jonschlinkert/remarkable) for Markdown support
- [Highlight.js](https://highlightjs.org/) for syntax highlighting
- [Imagemin](https://github.com/imagemin/imagemin) for image minification

## How to Use

Fork and clone the repo, `cd` into the directory, then run your preferred package manager or `npm install`.

Imagemagick is a dependency, so you also need to install it. To find out if it's installed, type `which magick` in your terminal. To install (on Mac), `brew install imagemagick`.

1. Write your markdown post in the `src/posts/` folder.
2. At the top of your file, include the blog's data in YAML front matter like so:
  ```yaml
  ---
  title: My first post
  publishDate: 2018-10-31
  description: A sample blog post for testing this build tool
  ---
  ```
3. Generate your posts with `npm run generate`. This will not delete stale posts. You must manually delete them. Also, it will overwrite posts with the same title.
4. Build with webpack! Run development mode with `npm start` and view the output at http://localhost:8080, or run the production build with `npm run build`. The `/build/` folder will contain the static production build ready for deployment.

You may re-generate your posts while the dev server is running. Just open a new tab in your terminal to do so. The dev server does not do hot-reloading, so after the generation is complete and webpack has finished re-bundling, you can refresh the localhost page to see the updated content.

### Highlight Themes

This project uses [Highlight.js](https://highlightjs.org) for syntax highlighting. The `github` theme is already set up, but you can easily switch to another.

1. Find your preferred theme in the [demo here](https://highlightjs.org/static/demo/).
2. Find how they spell the file name for your chosen theme [here](https://github.com/highlightjs/highlight.js/tree/master/src/styles).
3. In `src/index.js` and `src/layouts/post.ejs`, replace `github` with your preferred theme.

## Github Pages

To deploy to Github pages, in `package.json`, in the `gh-pages` script, modify the `ASSET_PATH` to be the name of your repo on Github. Then run `npm run gh-pages` to both build and deploy the `/build/` folder to your `gh-pages` branch on Github.

## Contributing

Does the idea of this blog starter excite you? Do you just have feedback on architecture? Tweet or DM me about it! [@thegreengreek](https://twitter.com/thegreengreek)
