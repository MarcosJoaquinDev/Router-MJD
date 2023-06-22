import chokidar from 'chokidar'
import * as path from 'path'
import { createPagePaths } from './writer.js'
const {pathname: root} = new URL('./',import.meta.url);
const _INDEX_PATH = path.join(root,'../pages');


await createPagePaths()


function main(){
  const watcher = chokidar.watch(_INDEX_PATH, {
    ignored: /^\./, // Ignora los archivos y carpetas ocultos
    persistent: true, // Mantener la observación activa después de la primera ejecución
    ignoreInitial: true,
  });
  let tempPath = '';
  watcher
    .on('add',async  path => {
      tempPath = searchRoutePath(path);
      if( isAPage(path) ) await createPagePaths()
    })
    .on('unlink', async path =>{
       const routeFileRemove = searchRoutePath(path);
       const fileChange = tempPath == routeFileRemove;
       if( isAPage(path) && !fileChange) await createPagePaths()
       tempPath = '';
    })
}
main()
function isAPage(path){
  return path.includes('.tsx') || path.includes('.jsx');
}
function searchRoutePath(path){
  const lastIndex = path.lastIndexOf('/')
  const namePath = path.slice(0,-(path.length - lastIndex))
  return namePath;
}
