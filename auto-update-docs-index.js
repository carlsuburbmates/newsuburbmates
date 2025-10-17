// auto-update-docs-index.js

const fs = require('fs');
const path = require('path');

// Directory containing documentation
const docsDir = path.join(__dirname, 'docs');
const indexFile = path.join(docsDir, 'index.md');

// Get all files in /docs directory, excluding index.md
const files = fs.readdirSync(docsDir)
  .filter(file => file !== 'index.md' && file.endsWith('.md'));

let indexContent = `# Project Documentation Index

_Automatically generated. Add descriptions in the script!_

`;

files.forEach(file => {
  // You can add custom description logic here
  let description = '';
  if (file === 'WEBHOOKS.md') description = 'Stripe setup and webhook guide';
  else if (file === 'copilot-instructions.md') description = 'AI agent workflow and automation instructions';
  // Add more as needed

  indexContent += `- [${file}](./${file})${description ? `: ${description}` : ''}\n`;
});

// Write updated index.md
fs.writeFileSync(indexFile, indexContent, 'utf8');
console.log('Docs index updated:', indexFile);
