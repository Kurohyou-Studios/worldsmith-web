const {promises:fs} = require('fs');
const watch = require('node-watch');
const path = require('path');

let config = {};

const isIgnored = (fullDirName) => {
  const ignoreArr = config.ignore || [];
  return ignoreArr.some((p)=>{
    const fullIgnorePath = path.resolve(p);
    return !path.relative(fullIgnorePath,fullDirName);
  })
};

const isValidType = (fileName) => {
  const validTypes = config.fileTypes || [];
  return validTypes.length ?
    validTypes.some((t)=>fileName.endsWith(`.${t}`)) :
    /\..+$/.test(fileName);
};

const processIndex = async (fileName) => {
  if(!isValidType(fileName)) return;
  let indexContent = '';
  let action = 'Updating';
  const dirName = path.dirname(fileName);
  const indexPath = path.resolve(dirName,'index.js');
  const trueFileName = fileName.replace(dirName,'').replace(/^\\/,'');
  const fullDirName = path.resolve(dirName);
  ignore = isIgnored(fullDirName);
  if(
    fullDirName.includes('node_modules') ||
    trueFileName === 'index.js' ||
    isIgnored(fullDirName)
  ) return;
  try{
    indexContent = await fs.readFile(indexPath,'utf8');
  }catch(err){
    action = 'Creating';
  }
  const shortFileName = trueFileName.replace(/\.[^\.]+$/,'');
  const variableName = shortFileName.replace(/\..+$/,'');
  const importStatement = `export { default as ${variableName} } from './${shortFileName}';`;
  if(!indexContent.includes(`./${shortFileName}`)){
    indexContent = indexContent ?
      indexContent += `\n${importStatement}` :
      importStatement;
    console.log(`${action} index.js file in ${dirName}`);
    await fs.writeFile(indexPath,indexContent,'utf8');
  }
};
watch('./',{recursive:true},async (event,fileName)=>{
  try{
    config = await fs.readFile('./auto.config.json','utf8')
      .then(t => JSON.parse(t));

  }catch(err){
    console.warn('Option file not found, all subfolders will have index files created');
  }
  // console.log('autoOptions',autoOptions);
  if(fileName && path.dirname(fileName) !== '.'){
    processIndex(fileName);
  }
})