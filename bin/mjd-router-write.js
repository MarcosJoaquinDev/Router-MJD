#!/usr/bin/env node
import { createPagePaths } from '../lib/router/writer.js';
try {
  await createPagePaths();
} catch (err) {
  console.error(err);
  process.exit(1);
}
