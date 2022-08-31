'use strict';
import { SO } from './SO.js';
// Class to represent the overall world that is created.
/**
 * A class to represent the world to be worked on
 */
export class Planet extends SO{
  /**
   * Create a new planet. Defaults to earth defaults
   * @param {object} arguments
   * @param {string} arguments.name - The name of the planet
   * @param {number} arguments.mass - The mass fo the planet in Earth masses
   * @param {number} arguments.density - Density of the planet in g/cm3
   * @param {number} arguments.tilt - The axial tilt of the planet in degrees
   * @param {number} arguments.period - Time to complete on rotation in earth hours
   * @param {number} arguments.albedo - The albedo of the planet between 0 (full dark) and 1 (full bright)
   * @param {number} arguments.greenhouse - The greenhouse effect of the planet from 0 (no atmosphere) to 500
   * @param {number} arguments.distance - Distance in AU of the semi-major axis of the planet's orbit
   * @param {number} arguments.eccentricity - How eccentric the planet's orbit is between 0 (perfect circle) and 1 (parabola)
   * @param {number} arguments.inclination - Inclination off the plane of the ecliptic in degrees. 0 for habitable, 0- 180 for all others (lower is better)
   * @param {number} arguments.pressure - Atmospheric pressure of the world in earth atmospheres
   * @param {object} arguments.gasPercent - Object describing the percentage of various gasses in the atmosphere
   * @param {number} arguments.gasPercent.o2 - Percentage of O2
   * @param {number} arguments.gasPercent.co2 - Percentage of CO2
   * @param {number} arguments.gasPercent.ar - Percentage of Ar
   */
  constructor({name,mass = 1,density = 5.51,tilt = 23.5,period = 24,albedo = 0.306,greenhouse = 1,distance = 1,eccentricity = 0,inclination = 0,pressure,gasPercent }){
    gasPercent  = gasPercent || {o2:21,co2:0.04,ar:0.9};
    if(!gasPercent.o2 || !gasPercent.co2 || !gasPercent.ar || !name){
      throw('The planet needs a name and a gas percentage object');
    }
    super(name,'Planet');
    this.mass = mass;
    this.density = density;
    this.tilt = tilt;
    this.period = period;
    this.albedo = albedo;
    this.greenhouse = greenhouse;
    this.distance = distance;
    this.eccentricity = eccentricity;
    this.inclincation = inclination;
    this.pressure = pressure;
    this.gasPercent = gasPercent;
  }
}