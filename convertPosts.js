const fs = require('fs')
const path = require('path')
const Remarkable = require('remarkable')
const hljs = require('highlight.js')
const ejs = require('ejs')

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

// Layout file to use for all posts
const layout = fs.readFileSync(path.resolve(__dirname, './posts/layout.ejs'), 'utf8')

// Data representing all posts
const postData = require('./postData.json')
// TODO: check for duplicate slugged titles

// Generate url-friendly html file names
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '_')           // Replace spaces with -
    .replace(/&/g, '-and-')         // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

// TODO: generate blog index page in reverse chrono order
// TODO: maybe use webpack to build <head></head>, etc.


// Construct html file for each post
postData.forEach((data) => {
  const {file, title, ...rest} = data
  const mdFile = fs.readFileSync(path.resolve(__dirname, `./posts/${file}`), 'utf8')
  // Convert markdown file to html
  const markdown = md.render(`${mdFile}`)
  // Generate the full html for the post's page using its data
  const html = ejs.render(layout, { body: String(markdown), title, ...rest})

  // Note: this is async - need to write for sync or wait until complete to chain other actions
  fs.writeFile(`./src/blog/${slugify(title)}.html`, html, function (err) {
    if (err) {
      return console.log(err);
    }
  });
})

console.log('Finished converting posts!');
