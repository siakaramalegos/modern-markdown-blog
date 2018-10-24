// Import files so webpack can see them
import './style.css'
// Syntax highlighting theme - replace `vs2015` with your preferred theme
import 'highlight.js/styles/github.css'
// Require all html files
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./', true, /\.html$/));

console.log('index.js is loaded');
