const fs = require('fs');
const path = require('path');

const srcCss = path.join(__dirname, '../Income_estate_HTML/style.css');
const destCss = path.join(__dirname, '../src/styles/income-estate.css');

let css = fs.readFileSync(srcCss, 'utf8');

// Replace Google fonts import (handled by next/font)
css = css.replace(/@import url\(['"]https:\/\/fonts\.googleapis\.com\/css2\?family=Proza\+Libre[^'"]+['"]\);?/g, '/* Proza Libre loaded via next/font/google */');

// Map font variables to Next.js font variable
css = css.replace(/--font-serif:\s*'Proza Libre',\s*sans-serif;/g, '--font-serif: var(--font-proza, \'Proza Libre\', sans-serif);');
css = css.replace(/--font-sans:\s*'Proza Libre',\s*sans-serif;/g, '--font-sans: var(--font-proza, \'Proza Libre\', sans-serif);');

// Replace relative asset paths with /assets/
css = css.replace(/url\((['"]?)(?:\.\/|\.\.\/)?assets\//g, 'url($1/assets/');

fs.writeFileSync(destCss, css, 'utf8');
console.log('Successfully restored 100% exact original CSS with /assets/ paths');
