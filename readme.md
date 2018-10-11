# Modern Markdown Blog

This is a markdown blog starter with a modern build process to create super-fast website with as little JavaScript as possible. Think of it like Jekyll + webpack.

The goals:
- Write blog posts in markdown because it's more fun.
- Automatically generate the blog post pages.
- Automatically generate the blog post index page.
- Use as little runtime JavaScript as possible (preferably none).
- Make it as fast as possible (e.g., automatically generate responsive images and perhaps webp formats too)

## How to Use

1. Write your markdown post in the `/posts/` folder.
2. At the top of your file, include the following data in YAML front matter:
  ```yaml
  ---
  title: My first post
  file: my_post.md
  publishDate: 2018-10-31
  description: A sample blog post for testing this build tool
  ---
  ```
3. Generate your posts with `npm run generate`. This will not delete stale posts. You must manually delete them. Also, it will overwrite posts with the same name.
4. [TODO: Run webpack to create the build - currently doesn't manage the new html files in `src/blog/`]

## Contributing

Does the idea of this blog starter excite you? Do you just have feedback on architecture? Tweet or DM me about it! [@thegreengreek](https://twitter.com/thegreengreek)
