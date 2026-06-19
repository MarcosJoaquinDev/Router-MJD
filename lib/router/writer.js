import * as fs from 'fs/promises';
import * as path from 'path';
import { PAGES_DIR, PAGES_JSON_PATH, isPageFile } from './constants.js';
function toRoutePath(absolutePath) {
    let route = absolutePath.replace(PAGES_DIR, '').replace(/\s+/g, '%20').replace(/\[([^/]+)\]/g, ':$1');
    if (/\bindex\.(jsx|tsx)$/i.test(route)) {
        return route.replace(/\/?index\.(jsx|tsx)$/i, '') || '/';
    }
    return route.replace(/\.(jsx|tsx)$/i, '');
}
async function walkDirectory(dirPath) {
    const entries = await fs.readdir(dirPath, {
        withFileTypes: true
    });
    const files = [];
    for (const entry of entries){
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            files.push(...await walkDirectory(fullPath));
        } else if (entry.isFile() && isPageFile(fullPath)) {
            files.push(fullPath);
        }
    }
    return files;
}
export async function createPagePaths() {
    try {
        const files = await walkDirectory(PAGES_DIR);
        const pages = files.map((filePath)=>({
                path: toRoutePath(filePath),
                module: filePath.replace(PAGES_DIR, '')
            }));
        const payload = JSON.stringify({
            pages
        });
        await fs.mkdir(path.dirname(PAGES_JSON_PATH), {
            recursive: true
        });
        await fs.writeFile(PAGES_JSON_PATH, payload, 'utf-8');
        console.log(`pages.json generated — ${pages.length} route(s)`);
    } catch (err) {
        console.error('Failed to generate pages.json:', err.message);
        process.exit(1);
    }
}
const isMainModule = process.argv[1] && import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
    await createPagePaths();
}
