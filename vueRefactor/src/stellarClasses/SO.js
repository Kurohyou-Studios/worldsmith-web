import { v1 as uuid } from 'uuid';

import { SOEvent } from './events';

export class SO{
  id;
  creation;
  propertiesToSerialize;
  /**
   * The object that owns this SO
   * @type {Galaxy|Planet|Star|System|Project}
   */
  parent;
  /**
   * The event instance to use for dispatching events from this element's children to it.
   * @type {SOEvent}
   */
  events = new SOEvent;
  name;
  type;
  children = [];
  /**
   * 
   * @param {string} name - The name of the stellar object
   * @param {string} [type = 'SO'] - The type of the stellar object. Should be Star, Planet, Galaxy, System, or Project
   */
  // Need to add actual distance, eccentricy, inclination, and angle random starting values
  constructor(name,type = 'SO',distance = Math.random(),eccentricity = Math.random(), angle=Math.random(), inclination=Math.random(),creation = Date.now(),id = uuid()){
    if(!name) throw('All Stellar Objects must have a name');
    this.name = name;
    this.id = id;
    this.creation = creation;
    this.type = type;
    this.distance = distance;
    this.eccentricity = eccentricity;
    this.angle = angle;
    this.inclination = inclination;
    this.propertiesToSerialize=['type','name','id','creation','children'];
    
    this.events.on('add-child',this.id,() =>{

    })
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

  /**
   * Adds one or more children to a Stellar Object
   * @param  {Array<Star|Galaxy|Planet|System>} children - Array of children to be added to the object
   */
  addChild(...children){
    children.forEach(child => {
      child.parent = this;
      this.children.push(child);
      this.events.dispatch('add-child',this.id,child);
      
      child.events.dispatch('add-parent',child.id);
    });
  }

  /**
   * Removes a child from a Stellar Object
   * @param  {SO} child - The SO descendant to remove
   */
  removeChild(child){
    const index = this.children.indexOf(child);
    if(index > -1){
      this.children.splice(index,1);
    }
    child.parent = null;
    this.events.dispatch('remove-child',this.id,child);
    child.events.dispatch('remove-parent',child.id,this);
  }

  //
  // Serialization
  //
  /**
   * Converts the Universe to a JSON representation
   */
  toJSON(){
    const digArray = (arr) =>{
      return arr.map(k => {
        if(Array.isArray(k)){
          return digArray(k);
        }else if(k.toJSON){
          return k.toJSON();
        }else{
          return k;
        }
      })
    };
    return this.serial.reduce((memo,key)=>{
      if(Array.isArray(this[key])){
        memo[key] = digArray(this[key]);
      }else{
        memo[key] = this[key]?.toJSON ?
          this[key].toJSON() :
          this[key];
      }
      return memo;
    },{parent:this.parent?.id});
  }

  /**
   * Converts the Universe to a YAML representation
   */
  toYAML(){
    const json = this.toJSON();
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
  static fromJSON(universeObj){
    
  }

  /**
   * Converts Worldsmith sheet Universe representation to a Universe Object
   * @param {string} universe - Google Sheet Version of a Universe
   * @param {string} smithVer - Semantic version of the worldsmith sheet content
   */
  static wSmith(universe,smithVer){
    
  }
}