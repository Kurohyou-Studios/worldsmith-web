'use strict';
import { colorTemperature2rgb as cTemp } from './colortemp.js';
import { SO } from './SO.js';
// import { v1 as uuid } from 'https://jspm.dev/uuid';
// Class to represent the overall Star that is created.
/**
 * A class to represent the Star to be worked on
 */
export class Star extends SO{
  mass;
  age;
  /**
   * 
   * @param {string} name - The name of the Star
   * @param {number} mass - The mass of the star in solar masses
   * @param {number} age - The age of the star in billions of earth years
   */
  constructor(name,mass,age){
    if(
      !name || typeof name !== 'string' ||
      Number.isNaN(+mass) ||
      Number.isNaN(+age)
    ){
      throw('A new star must have a name, mass, and age.');
    }
    super(name,'Star');
    this.mass = mass;
    this.age = age;
    this.serial.push('mass','age');
  }

  get mass(){
    return this.mass;
  }

  set mass(val){
    this.mass = val;
    this.emit(this);
  }

  get age(){
    return this.age;
  }

  set age(val){
    this.age = val;
    this.emit(this);
  }

  get luminosity() {
    return Star.calcLuminosity(this.mass);
  }

  get maxAge() {
    return Star.calcMaxAge(this.mass,this.luminosity);
  }

  get radius() {
    return Star.calcRadius(this.mass);;
  }
  
  get temperature() {
    return Star.calcTemperature(this.mass,this.radius,this.luminosity);
  }

  get density() {
    return Star.calcDensity(this.mass,this.radius);
  }

  get habZone() {
    return Star.calcHabZone(this.mass,this.luminosity);
  }

  get earth() {
    return Star.isEarth(this.mass,this.age);
  }

  get color() {
    return Star.calcColor(this.temperature);
  }

  get class() {
    return Star.calcClass(this.temperature);
  }

  /**
   * Returns true or false depending on if the given orbit is habitable
   * @param {number} orbit - The orbit in AU to check for habitability
   */
  isHabitable(orbit){
    return orbit >= this.habZone[0] && orbit <= this.habZone[1];
  }

  /**
   * 
   * @param {number|string} mass 
   * @returns 
   */
  static calcRadius(mass){
    mass = +mass;
    return !Number.isNaN(mass) && mass >= 0.075 && mass <= 100 ?
      (
        mass < 1 ?
          Math.pow(mass,0.8) :
          Math.pow(mass,0.57)
      ) :
      NaN;
  }
  
  /**
   * 
   * @param {number|string} mass 
   * @param {number|string} luminosity 
   * @returns 
   */
  static calcMaxAge(mass,luminosity){
    mass = +mass;
    luminosity = +luminosity;
    return !Number.isNaN(mass) && !Number.isNaN(luminosity) &&
      mass >= 0.075 && mass <= 100 ?
        mass * luminosity * 10 :
        NaN;
  }

  /**
   * 
   * @param {number|string} mass 
   * @returns 
   */
  static calcLuminosity(mass){
    mass = +mass;
    if(Number.isNaN(mass) && (mass <= 0.075 || mass >= 100)) return NaN;
    switch(true){
      case mass < 0.43:
        return 0.23 * Math.pow(mass,2.3);
      case mass < 2:
        return Math.pow(mass,4);
      default:
        return 1.4 * Math.pow(mass,3.5);
    }
  }
  
  /**
   * 
   * @param {number|string} mass 
   * @returns 
   */
  static calcDensity(mass,radius){
    mass = +mass;
    radius = +radius;
    if(
      Number.isNaN(mass) && Number.isNaN(radius) && 
      (mass <= 0.075 || mass >= 100)
    ) return NaN;
    return Math.pow(mass / radius,3);
  }
  
  /**
   * 
   * @param {number|string} mass 
   * @returns 
   */
  static calcTemperature(mass,radius,luminosity){
    mass = +mass;
    radius = +radius;
    luminosity = +luminosity;
    if(
      (
        Number.isNaN(mass) || Number.isNaN(radius) || Number.isNaN(luminosity)
      ) && 
      (mass <= 0.075 || mass >= 100)
    ) return NaN;
    return Math.pow(
        Math.pow(luminosity / radius,2)
      ,0.25) *
      5776;
  }
  
  /**
   * 
   * @param {number|string} kelvin 
   * @returns 
   */
  static calcColor(kelvin){
    kelvin = +kelvin;
    return Number.isNaN(kelvin) ?
      NaN :
      cTemp(kelvin);
  }
  
  /**
   * 
   * @param {number|string} mass 
   * @param {number|string} luminonsity 
   * @returns 
   */
  static calcHabZone(mass,luminosity){
    mass = +mass;
    luminosity = +luminosity;
    if(
      Number.isNaN(mass) && Number.isNaN(luminosity) && 
      (mass <= 0.075 || mass >= 100)
    ) return null;
    return [
      Math.round(Math.sqrt(1/1.1) * 1000) / 1000,
      Math.round(Math.sqrt(luminosity/0.53) * 1000) / 1000,
    ]
  }
  
  /**
   * 
   * @param {number|string} mass 
   * @returns 
   */
  static isEarth(mass,age){
    mass = +mass;
    age = +age;
    if(
      Number.isNaN(mass) && Number.isNaN(age) && 
      (mass <= 0.075 || mass >= 100)
    ) return null;
    switch(true){
      case mass >= 0.5 && mass <= 1.4:
        return age >= 3.5 ?
          'Yes' :
          'Star Too Young';
      default:
        return 'No';
    }
  }
  
  /**
   * 
   * @param {number|string} kelvin 
   * @returns 
   */
  static calcClass(kelvin){
    kelvin = +kelvin;
    if(Number.isNaN(kelvin)) return;
    const classLookup = {
    //"class":[minTemp,maxTemp,divisor]
      M:[2000,3700,1700],
      K:[3700,5200,1500],
      G:[5200,6000,800],
      F:[6000,7500,1500],
      A:[7500,10000,2500],
      B:[10000,33000,23000],
      O:[33000,95000,62000]
    }
    const letter = Object.keys(classLookup)
      .find(key => 
        classLookup[key][0] < kelvin && 
          classLookup[key][1] > kelvin
      );
    const num = Math.floor(
      (
        1 - ( kelvin - classLookup[letter][0] ) /
          classLookup[letter][2] 
      ) * 100
    ) / 10;
    return `${letter}${num}V`;
  }
}