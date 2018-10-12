// Import files so webpack can see them
import './style.css'
// Syntax highlighting theme - replace `vs2015` with your preferred theme
import 'highlight.js/styles/github.css'
import './index.html'
// Require all files in the blog directory
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./blog/', true, /\.html$/));

console.log('index.js is loaded');
