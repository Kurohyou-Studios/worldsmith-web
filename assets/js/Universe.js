'use strict';
// Class to represent the overall world that is created.
/**
 * A class to represent the world to be worked on
 */
export class Universe{
  /**
   * Constructs the Universe
   * @param {string} name - The name of the Universe
   */
  constructor(name){
    if(!name || typeof name !== 'string'){
      const err = new Error('Invalid Universe Name');
      throw err;
    }
    this.name = name;
    this.creation = Date.now();
    this.galaxies = [];
    Object.seal(this);
  }

  /**
   * Adds one or more galaxies to a world
   * @param  {Galaxy[]} galaxies - Array of galaxies to be added to the universe
   */
  addGalaxy(...galaxies){

  }

  /**
   * Removes a galaxy from the Universe. Does not destroy the galaxy.
   * @param  {Galaxy[]} galaxies - Array of galaxies to be added to the universe
   */
  removeGalaxy(...galaxies){

  }

  /**
   * Destroyes a galaxy and removes it from the Universe
   * @param  {Galaxy[]} galaxies - Array of galaxies to be added to the universe
   */
  destroyGalaxy(...galaxies){

  }

  // Serialization

  /**
   * Converts the Universe to a JSON representation
   */
  toJSON(){
    return '{}';
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
  toWSmith(){

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