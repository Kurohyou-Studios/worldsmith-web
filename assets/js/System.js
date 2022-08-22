import { Star } from './Star.js';
export class System{
  #orbits;
  #closeOrbit;
  constructor(name,spacing,orbit1,giantOrbit,star){
    spacing = +spacing
    orbit1 = +orbit1
    giantOrbit = +giantOrbit
    if(
      !name || typeof name !== 'string' ||
      Number.isNaN(spacing) ||
      Number.isNaN(orbit1) ||
      Number.isNaN(giantOrbit) ||
      !star instanceof Star
    ){
      throw('A new system must have a name, spacing factor, first orbit, an outermost gas giant orbit, and a Star.');
    }
    this.name = name;
    this.spaceFactor = spacing;
    this.#closeOrbit = orbit1;
    this.outerGiant = giantOrbit;
    this.star = star;
    this.creation = Date.now();
    // [...Array(8).keys()]
    //   .map(k => k + 1)
    //   .forEach(k => {
    //     this.orbits.push({distance:})
    //   })
    Object.seal(this);
  }

  /**
   * Adds a body(ies) to the planetary system
   * @param  {...Star|Planet} bodies - Stellar objects to add (Star or Planet)
   * @param {number} orbit - The orbit index in which to insert the object
   */
  addBody(body,orbit){
  }

  get orbit1(){
    return this.#closeOrbit;
  }

  set orbit1(orbit){
    orbit = +orbit;
    if(Number.isNaN(orbit)) throw('Invalid orbit. Orbit must be a number.');
    if(orbit < this.innerLimit) throw('Invalid orbit; too close to star');
    this.#closeOrbit = orbit;
  }

  get frostLine(){
    return Math.round(4.85 * Math.sqrt(this.star.luminosity) * 1000) / 1000;
  }

  get innerLimit(){
    const precisionFactor = 10000
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