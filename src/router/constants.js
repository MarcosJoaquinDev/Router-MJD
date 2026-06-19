import { fileURLToPath } from 'url';
import * as path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = process.cwd();

const PAGES_DIR = path.join(PROJECT_ROOT, 'src/pages');
const PAGES_JSON_PATH = path.join(__dirname, 'pages.json');
const PUBLIC_PAGES_JSON_PATH = path.join(PROJECT_ROOT, 'public', 'pages.json');

const PAGE_EXTENSIONS = ['.jsx', '.tsx'];

function isPageFile(filePath) {
  return PAGE_EXTENSIONS.some(ext => filePath.endsWith(ext));
}

export { PAGES_DIR, PAGES_JSON_PATH, PUBLIC_PAGES_JSON_PATH, isPageFile };
