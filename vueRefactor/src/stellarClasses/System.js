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
   * @param {Star|Array<Star>} star - The star that the system is around
   */
  constructor({
    name = 'New System',
    spacing = 0.3,
    orbit1 = 0.4,
    starIDs = [],
    planetIDs = [],
    creation,
    id
  }){
    if(
      !name || typeof name !== 'string' ||
      Number.isNaN(spacing) ||
      Number.isNaN(orbit1)
    ){
      throw 'A new system must have a name, spacing factor, first orbit, an outermost gas giant orbit, and a Star (or array of stars).';
    }
    super(name,'System',creation,id);
    spacing = +spacing;
    orbit1 = +orbit1;
    this.starIDs = starIDs;
    this.planetIDs = planetIDs;
    if(!this.starIDs.length){
      const star = new Star({});
      this.addChild(star);
      this.starIDs.push(star.id);
    }
    this.spaceFactor = spacing;
    this.serial.push('starIDs','orbit1','spaceFactor','outerGiant','starIDs','planetIDs','orbits');
    this.events.on('add-child',this.id,this.handleChildAdd,this);
    this.events.on('remove-child',this.id,this.handleChildRemove,this);
  }

  /**
   * 
   * @param {UUID} soID - the id of the triggering element
   * @param {SO} child - The child element that was added to the system.
   */
  handleChildAdd(child){
    if(child.type === 'Star' && this.starIDs.indexOf(child.id)< 0){
      this.starIDs.push(child.id);
    }else if(child.type !== 'Star' && this.planetIDs.indexOf(child.id)< 0){
      this.planetIDs.push(child.id);
    }
  }

  handleChildRemove(child){
    let index;
    let idProp;
    if(child.type === 'Star'){
      index = this.starIDs.indexOf(child.id);
      idProp = 'starIDs';
    }else{
      index = this.planetIDs.indexOf(child.id);
      idProp = 'planetIDs';
    }
    if(index > -1){
      this[idProp].splice(index,1);
    }
  };

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

  get stars(){
    return this.children.filter(child => this.starIDs.indexOf(child.id) > -1);
  }

  get frostLine(){
    const totalLuminosity = this.totalLuminosity;
    return Math.round(4.85 * Math.sqrt(totalLuminosity) * 1000) / 1000;
  }

  /**
   * Need to switch over to roche limit calculation
   */
  get innerLimit(){
    const precisionFactor = 10000;
    const totalMass = this.totalMass;
    return 0.1 * totalMass;
  }

  get orbits(){
    return [...Array(19).keys()]
      .reduce((memo,k)=>{
        const newOrbit = Math.round((this.orbit1 +
          (this.spaceFactor * Math.pow(2,k))) * 100) / 100;
        memo.push({
          distance:newOrbit,
          frost:newOrbit >= this.frostLine
        });
        return memo;
      },[
        {
          distance:this.orbit1,
          frost:this.orbit1 >= this.frostLine
        }
      ])
  }

  get outerResonance(){
    const totalMass = this.stars.reduce((total,star) => {
      return total += star.mass;
    },0);
    const gasPeriod = Math.round(
      Math.sqrt(
        Math.pow(this.outerGiant,3) /
        totalMass
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
        Math.round(Math.pow(Math.pow(periodArr[0],2)*totalMass,1/3) * 1000) / 1000,
        Math.round(Math.pow(Math.pow(periodArr[1],2)*totalMass,1/3) * 1000) / 1000,
      ]
    }
  }

  get debris(){
    return this.outerResonance.AU;
  }

  get totalLuminosity(){
    return this.stars.reduce((total,star) =>{
      return total += star.luminosity;
    },0);
  }

  get totalMass(){
    return this.stars.reduce((total,star) => {
      return total += star.mass;
    },0);
  }

  get habZone() {
    const totalMass = this.totalMass;
    const totalLuminosity = this.totalLuminosity;
    if(
      Number.isNaN(totalMass) && Number.isNaN(totalLuminosity) && 
      (totalMass <= 0.075 || totalMass >= 100)
    ) return null;
    return [
      Math.round(Math.sqrt(1/1.1) * 1000) / 1000,
      Math.round(Math.sqrt(totalLuminosity/0.53) * 1000) / 1000,
    ]
  }
}