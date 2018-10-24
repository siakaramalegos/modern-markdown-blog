const fs = require('fs')
const glob = require('glob')
const fm = require('front-matter')
const path = require('path')
const Remarkable = require('remarkable')
const hljs = require('highlight.js')
const ejs = require('ejs')
const im = require('imagemagick')

// Initialize markdown function with syntax highlighting by highlight.js
var md = new Remarkable({
  langPrefix: 'hljs language-',
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
// TODO: check for duplicate slugged titles

let blogData = []

glob('**/*.md', {cwd: './src/posts/'}, function(err, files) {
  if (err) throw err

  // Construct html file for each post
  files.forEach((file) => {
    fs.readFile(path.resolve(__dirname, `./src/posts/${file}`), 'utf8', function (err, data) {
      if (err) throw err

      // Separate the front matter attributes from the body of the markdown
      const {attributes, body} = fm(data)
      const slug = slugify(attributes.title)
      blogData.push({
        slug,
        ...attributes,
      })

      // Convert markdown body to html
      const htmlBody = md.render(body)

      // Generate the full post html (adds title, date, etc)
      ejs.renderFile('./src/layouts/post.ejs', { body: String(htmlBody), ...attributes}, function(err, post) {
        if (err) throw err
        fs.writeFileSync(`./src/${slug}.html`, post)
        console.log(`Finished converting ${attributes.title}!`);
      })
    })
  })
})

// TODO: fix race condition
setTimeout(() => {
  // Generate the blog index page
  ejs.renderFile('./src/layouts/blogIndex.ejs', { blogData }, function (err, html) {
    if (err) throw err
    fs.writeFileSync(`./src/index.html`, html)
    console.log(`Finished converting blog index!`);
  })
}, 2000);

// Generate image sets
glob('**/*.jpg', { cwd: './src/images/originals/' }, function (err, files) {
  if (err) throw err

  // Construct html file for each post
  files.forEach((file) => {
    im.resize({
      srcData: fs.readFileSync(path.resolve(__dirname, `./src/images/originals/${file}`), 'binary'),
      dstPath: `./src/images/small_${file}`,
      width: 256
    }, function (err, stdout, stderr) {
      if (err) throw err;
      console.log(`resized ${file} to fit within 256x256px`);
    });
  })
})
