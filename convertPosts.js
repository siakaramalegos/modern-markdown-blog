const fs = require('fs')
const glob = require('glob')
const fm = require('front-matter')
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

// Post layout file to use for all posts
const postLayout = fs.readFileSync(path.resolve(__dirname, './layouts/post.ejs'), 'utf8')

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
// TODO: check for duplicate slugged titles

glob('**/*.md', {cwd: './posts/'}, function(err, files) {
  if (err) throw err

  // Construct html file for each post
  files.forEach((file) => {
    fs.readFile(path.resolve(__dirname, `./posts/${file}`), 'utf8', function (err, data) {
      if (err) throw err

      // Separate the front matter attributes from the body of the markdown
      const {attributes, body} = fm(data)

      // Convert markdown body to html
      const htmlBody = md.render(body)

      // Generate the full post body (adds title, date, etc)
      const post = ejs.render(postLayout, { body: String(htmlBody), ...attributes})

      fs.writeFileSync(`./src/blog/${slugify(attributes.title)}.html`, post)
      console.log(`Finished converting ${attributes.title}!`);
    })
  })
})

