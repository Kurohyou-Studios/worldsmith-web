'use strict';
import { SO } from './SO.js';
// Class to represent the overall world that is created.
/**
 * A class to represent the world to be worked on
 */
export class Project extends SO{
  /**
   * Constructs the Universe
   * @param {string} name - The name of the Project
   */
  constructor(name){
    if(!name || typeof name !== 'string'){
      const err = new Error('Invalid Project Name');
      throw err;
    }
    super(name,'Project');
    this.children = [];
    this.serial.push('children');
  }

  /**
   * Adds one or more galaxies to a world
   * @param  {Galaxy[]} galaxies - Array of galaxies to be added to the universe
   */
  addChild(...children){

  }

  /**
   * Removes a galaxy from the Universe. Does not destroy the galaxy.
   * @param  {Galaxy[]} galaxies - Array of galaxies to be added to the universe
   */
  removeChild(...children){

  }
}