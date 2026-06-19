import chokidar from 'chokidar';
import { PAGES_DIR, isPageFile } from './constants.js';
import { createPagePaths } from './writer.js';

let writeTimer = null;

function debouncedWrite() {
  if (writeTimer) clearTimeout(writeTimer);
  writeTimer = setTimeout(async () => {
    writeTimer = null;
    try {
      await createPagePaths();
    } catch (err) {
      console.error('Watcher: write error', err);
    }
  }, 200);
}

function main() {
  const watcher = chokidar.watch(PAGES_DIR, {
    ignored: /(^|[/\\])\../,
    persistent: true,
    ignoreInitial: true,
  });

  watcher
    .on('add', (filePath) => {
      if (isPageFile(filePath)) debouncedWrite();
    })
    .on('unlink', (filePath) => {
      if (isPageFile(filePath)) debouncedWrite();
    })
    .on('error', (error) => {
      console.error('Watcher error:', error.message);
    });

  console.log(`Watching ${PAGES_DIR} for changes...`);
}

main();
