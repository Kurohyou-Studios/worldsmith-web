export class fsAsync{
  handle = null;

  constructor(handle){
    this.handle = handle;
  }

  async read(){
    const defaultData = {
      name: this.handle.name.replace(/\.world$/,''),
      children: []
    };
    const file = await this.handle.getFile();
    const text = await file.text();
    try{
      return JSON.parse(text) || 
        defaultData;
    }catch(err){
      return defaultData;
    }
  }

  async write(data){
    const jsonData = JSON.stringify(data,null,2);
    const writable = await this.handle.createWritable();
    await writable.write(jsonData);
    await writable.close()
  }
}