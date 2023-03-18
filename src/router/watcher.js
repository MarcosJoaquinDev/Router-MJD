import chokidar from 'chokidar'
import * as path from 'path'
import {exec}  from 'child_process';
const {pathname: root} = new URL('./',import.meta.url);
const _INDEX_PATH = path.join(root,'../pages');

function main(){
  const watcher = chokidar.watch(_INDEX_PATH, {
    ignored: /^\./, // Ignora los archivos y carpetas ocultos
    persistent: true, // Mantener la observación activa después de la primera ejecución
    ignoreInitial: true,
  });
  let tempPath = '';
  watcher
    .on('add', path => {
      console.log(`Archivo creado : ${path}`)
      tempPath = searchRoutePath(path);
      if( isAPage(path) ) writer()
    })
    .on('unlink', async path =>{
       console.log(`Archivo borrado : ${path}`);
       const routeFileRemove = searchRoutePath(path);
       const fileChange = tempPath == routeFileRemove;
       console.log(tempPath, '---',routeFileRemove);
       if( isAPage(path) && !fileChange) writer()
       tempPath = '';
    })
}
main()
function isAPage(path){
  return path.includes('.tsx') || path.includes('.jsx');
}
function writer(){
  exec('npm run write', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al ejecutar el script: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
  }
  function searchRoutePath(path){
    const lastIndex = path.lastIndexOf('/')
    const namePath = path.slice(0,-(path.length - lastIndex))
    return namePath;
  }