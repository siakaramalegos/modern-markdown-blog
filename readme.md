# Modern Markdown Blog

This is a markdown blog starter with a modern build process to create super-fast website with as little JavaScript as possible. Think of it like Jekyll + webpack.

The goals:
- Write blog posts in markdown because it's more fun.
- Automatically generate the blog post pages.
- Automatically generate the blog post index page.
- Use as little runtime JavaScript as possible (preferably none).
- Make it as fast as possible (e.g., automatically generate responsive images and perhaps webp formats too)

You can view a deployed sample [here](https://siakaramalegos.github.io/modern-markdown-blog/).

## How to Use

Fork and clone the repo, `cd` into the directory, then run your preferred package manager or `npm install`.

1. Write your markdown post in the `/posts/` folder.
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

## Github Pages

To deploy to Github pages, in `package.json`, in the `gh-pages` script, modify the `ASSET_PATH` to be the name of your repo on Github. Then run `npm run gh-pages` to both build and deploy the `/build/` folder to your `gh-pages` branch on Github.

## Contributing

Does the idea of this blog starter excite you? Do you just have feedback on architecture? Tweet or DM me about it! [@thegreengreek](https://twitter.com/thegreengreek)
