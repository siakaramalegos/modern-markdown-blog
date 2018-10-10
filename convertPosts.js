const fs = require('fs')
const path = require('path')
const mdFile = fs.readFileSync(path.resolve(__dirname, './posts/my_post.md'), 'utf8')

const Remarkable = require('remarkable')
// const hljs = require('highlight.js')
const md = new Remarkable()

// // Actual default values
// var md = new Remarkable({
//   highlight: function (str, lang) {
//     if (lang && hljs.getLanguage(lang)) {
//       try {
//         return hljs.highlight(lang, str).value;
//       } catch (err) { }
//     }

//     try {
//       return hljs.highlightAuto(str).value;
//     } catch (err) { }

//     return ''; // use external default escaping
//   }
// });

console.log(md.render(`${mdFile}`))