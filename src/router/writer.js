import * as fs from 'fs'
import * as path from 'path'

// [index path pages] Folder app
const DIR_PAGES = '../pages';
const JSON_PAGES = '/pages.json';

// [root] dirname root
const {pathname: root} = new URL('./',import.meta.url);

// [index path] path of folder app
const INDEX_PATH = path.join(root,DIR_PAGES);
const JSON_DIR = path.join(root,JSON_PAGES);
// [paths dir app ] Array for paths of app directory
// "../app/index.jsx ../app/home/index.tsx ../etc "
const PATHS_DIR_APP = [];
const replacingDynamicPaths = (path) => path.replace(/\[/g, ':').replace(/\]/g, '');
const removePathIndex = (path) => path.replace(INDEX_PATH, '');

export async function createPagePaths(){
  iterateFolderApp(INDEX_PATH);
  const pages = PATHS_DIR_APP.map( r => {
    let route = removePathIndex(r);
    let pathRoute = replacingDynamicPaths(route);
    const isAPage = route.includes('.jsx') || route.includes('.tsx');
    const isAIndexPage = route.includes('index.');
    if (isAPage && isAIndexPage) return { path:pathRoute.slice(0,-9), module:route}
    if (isAPage) return { path:pathRoute.slice(0,-4), module:route}
    return false;
  }).filter(Boolean);

  fs.writeFileSync(JSON_DIR, JSON.stringify({pages}), 'utf-8');

}

function iterateFolderApp(indexDir) {
  const files = fs.readdirSync(indexDir,'utf-8');
  files.forEach((file) => {
    const route = path.join(indexDir, file);
    const statistics = fs.statSync(route);
    if (statistics.isDirectory()) {
      iterateFolderApp(route);
    } else {
      PATHS_DIR_APP.push(route);
    }
  });
}
//await createPagePaths();