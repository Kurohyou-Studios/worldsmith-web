export class SO{
  id;
  func;
  creation;
  propertiesToSerialize;
  /**
   * 
   * @param {string} name - The name of the stellar object
   * @param {string} type - The type of the stellar object. Should be Star, Planet, Galaxy, System, or Project
   */
  constructor(name,type = 'unspecified'){
    if(!name) throw('All Stellar Objects must have a name');
    this.name = name;
    this.id = uuid();
    this.creation = Date.now();
    this.type = type;
    this.propertiesToSerialize=['type','name','id','creation'];
  }
  get serial(){
    return this.propertiesToSerialize;
  }

  get id(){
    return this.id;
  }

  get creation(){
    return this.creation;
  }

  addListener(func){
    this.func = func;
  }

  emit(){
    return this.func ?
      this.func(this) :
      'No parent defined';
  }
  // Serialization
  /**
   * Converts the Universe to a JSON representation
   */
  toObject(){
    const digArray = (arr) =>{
      return arr.map(k => {
        if(Array.isArray(k)){
          return digArray(k);
        }else if(k.toObject){
          return k.toObject();
        }else{
          return k;
        }
      })
    };
    return this.serial.reduce((memo,key)=>{
      if(Array.isArray(this[key])){
        memo[key] = digArray(this[key]);
      }else{
        memo[key] = this[key].toObject ?
          this[key].toObject() :
          this[key];
      }
      return memo;
    },{});
  }

  toJSON(){
    return JSON.stringify(this.toObject());
  }

  /**
   * Converts the Universe to a YAML representation
   */
  toYAML(){
    const json = this.toObject();
  }

  /**
   * Converts the Universe to a Worldsmith google sheet format
   */
  toSmith(){

  }

  /**
   * Converts JSON Universe representation to a Universe Object
   * @param {Object} universeObj - JSON version of a universe
   */
  static json(universeObj){
    
  }

  /**
   * Converts JSON Universe representation to a Universe Object
   * @param {String} universe - YAML string version of the Universe
   */
  static yaml(universe){
    
  }

  /**
   * Converts JSON Universe representation to a Universe Object
   * @param {string} universe - Google Sheet Version of a Universe
   * @param {string} smithVer - Semantic version of the worldsmith sheet content
   */
  static wSmith(universe,smithVer){
    
  }
}