'use strict';
import { Star } from './Star.js';
import { SO } from './SO.js';

export class System extends SO{
  orbits;
  closeOrbit;

  starIDs = [];
  planetIDs = [];
  /**
   * 
   * @param {string} name - The name of the system
   * @param {number} spacing - The logarithmic spacing factor of the system
   * @param {number} orbit1 - The distance in AU of the first orbiting planet
   * @param {number} giantOrbit - The distance in AU of the last gas giant
   * @param {Star|Array<Star>} star - The star that the system is around
   */
  constructor({name = 'New System',spacing = 0.3,orbit1 = 0.4,giantOrbit = 30.07,star,creation,id}){
    spacing = +spacing
    orbit1 = +orbit1
    giantOrbit = +giantOrbit
    if(
      !name || typeof name !== 'string' ||
      Number.isNaN(spacing) ||
      Number.isNaN(orbit1) ||
      Number.isNaN(giantOrbit)
    ){
      throw 'A new system must have a name, spacing factor, first orbit, an outermost gas giant orbit, and a Star (or array of stars).';
    }
    super(name,'System',creation,id);
    if(star){
      star.parent = this;
      this.star = star;
      this.starIDs.push(star.id);
      this.orbit1 = orbit1;
    }
    this.spaceFactor = spacing;
    this.outerGiant = giantOrbit;
    this.serial.push('star','orbit1','spaceFactor','outerGiant','starIDs','planetIDs','orbits');
  }

  /**
   * Adds a body(ies) to the planetary system
   * @param  {...Star|Planet} bodies - Stellar objects to add (Star or Planet)
   * @param {number} orbit - The orbit index in which to insert the object
   */
  addBody(body,orbit){
    orbit = +orbit;
    if(!body || Number.isNaN(orbit)) throw('Invalid Arguments; Must pass a planet object and specify an orbital track between 0 and 19');
    if(body.type==='Star'){
      this.starIDs.push(body.id);
    }else{
      this.planetIDs.push(body.id);
    }
    this.addChild(body);
  }

  updateSystem(){
    const msg = 'Will Update System';
    console.log(msg);
    return msg;
  }

  get orbit1(){
    return this.closeOrbit;
  }

  set orbit1(orbit){
    orbit = +orbit;
    if(Number.isNaN(orbit)) throw('Invalid orbit. Orbit must be a number.');
    if(orbit < this.innerLimit) throw('Invalid orbit; too close to star');
    this.closeOrbit = orbit;
  }

  get frostLine(){
    return Math.round(4.85 * Math.sqrt(this.star.luminosity) * 1000) / 1000;
  }

  get innerLimit(){
    const precisionFactor = 10000;
    return Math.round(
      (
        2.455 *
        ( this.star.radius * 696340 ) *
        Math.pow(
          (this.star.density * 1408) /
          5400
        ,1 / 3) /
        149600000
      ) * precisionFactor
    ) / precisionFactor;
  }

  get orbits(){
    return [...Array(19).keys()]
      .reduce((memo,k)=>{
        const newOrbit = Math.round((this.orbit1 +
          (this.spaceFactor * Math.pow(2,k))) * 100) / 100;
        memo.push({
          distance:newOrbit,
          frost:newOrbit >= this.frostLine,
          habitable:this.star.isHabitable(newOrbit)
        });
        return memo;
      },[
        {
          distance:this.orbit1,
          frost:this.orbit1 >= this.frostLine,
          habitable:this.star.isHabitable(this.orbit1)
        }
      ])
  }

  get outerResonance(){
    const gasPeriod = Math.round(
      Math.sqrt(
        Math.pow(this.outerGiant,3) /
        this.star.mass
      ) * 1000
    ) / 1000;
    const periodArr = [
      gasPeriod / 2 * 3,
      gasPeriod / 1 * 2
    ];
    return {
      gPeriod: gasPeriod,
      period: periodArr,
      AU: [
        Math.round(Math.pow(Math.pow(periodArr[0],2)*this.star.mass,1/3) * 1000) / 1000,
        Math.round(Math.pow(Math.pow(periodArr[1],2)*this.star.mass,1/3) * 1000) / 1000,
      ]
    }
  }

  get debris(){
    return this.outerResonance.AU;
  }
}