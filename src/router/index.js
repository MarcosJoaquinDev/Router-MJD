import * as fs from 'fs'
import * as path from 'path'

const ROUTES = [];
const {pathname: root} = new URL('./',import.meta.url);
const _INDEX_PATH = path.join(root,'../pages');

async function createPagePaths(){
  iterateFolderApp(_INDEX_PATH)
  const paths = ROUTES.map( r => {
    const route = r.replace(_INDEX_PATH, '');
    const isAPage = route.includes('.jsx') || route.includes('.tsx');
    const isAIndexPage = route.includes('index.');
    if(isAPage && isAIndexPage) return { path:route.slice(0,-9), module:route}
    if (isAPage) return { path:route.slice(0,-4), module:route}
    return false;
  })
  const pages = paths.filter(p => p);
  fs.writeFileSync(_INDEX_PATH + '/pages.json',JSON.stringify({pages}),'utf-8');
}

function iterateFolderApp(indexDir) {
  const files = fs.readdirSync(indexDir,'utf-8');
  files.forEach((file) => {
    const route = path.join(indexDir, file);
    const statistics = fs.statSync(route);
    if (statistics.isDirectory()) {
      iterateFolderApp(route);
    } else {
      ROUTES.push(route);
    }
  });
}
createPagePaths();