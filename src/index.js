// Import files so webpack can see them
import './style.css'
// Require all files in the blog directory
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./blog/', true, /\.html$/));

console.log('index.js is loaded');
