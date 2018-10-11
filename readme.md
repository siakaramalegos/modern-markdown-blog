# Modern Markdown Blog

This is a markdown blog starter with a modern build process to create super-fast website with as little JavaScript as possible. Think of it like Jekyll + webpack.

## How to Use

1. Write your markdown post in the `/posts/` folder.
2. Provide data for that post in the `postData.json` file. Currently, this is not sorted, so put newer posts at the top.
3. Generate your posts with `npm run generate`. This will not delete stale posts. You must manually delete them. Also, it will overwrite posts with the same name.
4. [TODO: Run webpack to create the build - currently doesn't manage the new html files in `src/blog/`]

## Contributing

Does the idea of this blog starter excite you? Do you just have feedback on architecture? Tweet or DM me about it! [@thegreengreek](https://twitter.com/thegreengreek)
