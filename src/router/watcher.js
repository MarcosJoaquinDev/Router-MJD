import chokidar from 'chokidar'
import * as path from 'path'
import {exec} from 'child_process'
const {pathname: root} = new URL('./',import.meta.url);
const _INDEX_PATH = path.join(root,'../../../../src/pages');

function main(){
  const watcher = chokidar.watch(_INDEX_PATH, {
    ignored: /^\./, // Ignora los archivos y carpetas ocultos
    persistent: true, // Mantener la observación activa después de la primera ejecución
    ignoreInitial: true,
  });
  let tempPath = '';
  watcher
    .on('add', async path => {
      console.log('add');
      tempPath = searchRoutePath(path);
      if( isAPage(path) )write()

    })
    .on('unlink',async path =>{
      console.log('unlink');
       const routeFileRemove = searchRoutePath(path);
       const fileChange = tempPath == routeFileRemove;
       if( isAPage(path) && !fileChange) await write()
       tempPath = '';
    })
}
main()
function isAPage(path){
  return path.includes('.tsx') || path.includes('.jsx');
}
function write(){
  exec('npm run write',(error,stdout,stderr)=>{
    if(error){
      console.error('error');
      return
    }
    console.log('stdoout: ',stdout);
    console.error('stderr: ',stderr);
  })
}
function searchRoutePath(path){
  const lastIndex = path.lastIndexOf('/')
  const namePath = path.slice(0,-(path.length - lastIndex))
  return namePath;
}
