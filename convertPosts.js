const fs = require('fs')
const path = require('path')
const Remarkable = require('remarkable')
const hljs = require('highlight.js')
const ejs = require('ejs')

// Layout file to use for all posts
const layout = fs.readFileSync(path.resolve(__dirname, './posts/layout.ejs'), 'utf8')
// const layout = require('./posts/layout.ejs')

// Sample markdown post file
const mdFile = fs.readFileSync(path.resolve(__dirname, './posts/my_post.md'), 'utf8')

// Initialize markdown function with syntax highlighting by highlight.js
var md = new Remarkable({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) { }
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) { }

    return ''; // use external default escaping
  }
});

// Convert sample markdown file to html
const markdown = md.render(`${mdFile}`)

// Data associated with sample post
const context = {title: 'My First Post', body: String(markdown)}

// Generate the full html for the sample post's page using its data
const html = ejs.render(layout, context)

console.log(html);
