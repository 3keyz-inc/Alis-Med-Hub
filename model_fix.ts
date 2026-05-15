import fs from 'fs';
import path from 'path';

const file = path.resolve(process.cwd(), 'src/services/geminiService.ts');
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/gemini-3-pro-image-preview/g, 'gemini-2.5-pro');
content = content.replace(/gemini-3-pro-preview/g, 'gemini-2.5-pro');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed gemini models in geminiService.ts');
