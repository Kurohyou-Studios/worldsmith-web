import { describe, expect, test } from 'vitest'

import { System } from '../System.js';
import { Star } from '../Star.js';
import { Planet } from '../Planet.js';

describe('System class',()=>{
  describe('Instance operations',()=>{
    test('Initializing without a name should throw an error',()=>{
      expect(()=>{
        new System({});
      })
        .toThrow('A new system must have a name, spacing factor, first orbit, an outermost gas giant orbit, and a Star (or array of stars).');
    });
    const testName = 'Test System';
    const testSpacing = 0.3;
    const testOrbit = 0.4;
    const testGiant = 30.07;
    const testStar = new Star({name:'Test Star',mass:1,age:4.5});
    const testSystem = new System({name:testName,spacing:testSpacing,orbit1:testOrbit,giantOrbit:testGiant,star:testStar});
    const testPlanet = new Planet({name:'test Planet'});
    test('Attempting to update a calc only property on a created System should throw an error',()=>{
      expect(()=>{
        testSystem.innerLimit = 'Inner Limit is calc only';
      })
        .toThrow('Cannot set property innerLimit of #<System> which has only a getter');
    });
    test('A newly created System should be initialized with a name, creation date, and all the calculated properties of the System.',()=>{
      const expectedOrbits = [
        {distance:0.4,frost:false,habitable:false},
        {distance:0.70,frost:false,habitable:false},
        {distance:1.00,frost:false,habitable:true},
        {distance:1.60,frost:false,habitable:false},
        {distance:2.80,frost:false,habitable:false},
        {distance:5.20,frost:true,habitable:false},
        {distance:10.00,frost:true,habitable:false},
        {distance:19.60,frost:true,habitable:false},
        {distance:38.80,frost:true,habitable:false},
        {distance:77.20,frost:true,habitable:false},
        {distance:154.00,frost:true,habitable:false},
        {distance:307.60,frost:true,habitable:false},
        {distance:614.80,frost:true,habitable:false},
        {distance:1229.20,frost:true,habitable:false},
        {distance:2458.00,frost:true,habitable:false},
        {distance:4915.60,frost:true,habitable:false},
        {distance:9830.80,frost:true,habitable:false},
        {distance:19661.20,frost:true,habitable:false},
        {distance:39322.00,frost:true,habitable:false},
        {distance:78643.60,frost:true,habitable:false},
      ];
      const expectedDebris = [39.403, 47.733];
      const expectedResonances = {
        gPeriod: 164.892,
        period: [247.338, 329.784],
        AU: [39.403, 47.733]
      };

      // Passed values
      expect(testSystem.name).toEqual(testName);
      expect(testSystem.spaceFactor).toEqual(testSpacing);
      expect(testSystem.outerGiant).toEqual(testGiant);
      expect(testSystem.star).toEqual(testStar);
      expect(testSystem.orbit1).toEqual(testOrbit);
      expect(testSystem.serial).toEqual(['type','name','id','creation','children','star','orbit1','spaceFactor','outerGiant','starIDs','planetIDs','orbits']);

      // System calculated Properties
      expect(testSystem.innerLimit).toEqual(0.0073);
      expect(testSystem.frostLine).toEqual(4.850);
      expect(testSystem.orbits).toEqual(expectedOrbits);
      expect(testSystem.outerResonance).toEqual(expectedResonances);
      expect(testSystem.debris).toEqual(expectedDebris);
    });

    test('Attempting to set orbit 1 lower than the minimum orbit should throw an error',()=>{
      expect(()=>{
        testSystem.orbit1 = 0.0070;
      })
        .toThrow('Invalid orbit; too close to star');
    });

    test('Setting orbit 1 should update dependent features',()=>{
      const expectedOrbit = 0.5;
      testSystem.orbit1 = 0.5;
      expect(testSystem.orbit1).toEqual(expectedOrbit);

      //Return to status quo
      testSystem.orbit1 = 0.4;
    });
    test('Modifying the Star should modify the dependent system stats',()=>{
      testStar.mass = 0.5;
      expect(testSystem.innerLimit).toEqual(0.0037);
      testStar.mass = 1;
    });
    describe('Adding a planet',()=>{
      test('Adding a planet without a defined orbital index should throw an error',()=>{
        expect(()=>testSystem.addBody(testPlanet))
          .toThrow('Invalid Arguments; Must pass a planet object and specify an orbital track between 0 and 19');
      });
      test('The system orbits should contain the planet that is added to them',()=>{
        testSystem.addBody(testPlanet,1);
        expect(testSystem.planetIDs).toContainEqual(testPlanet.id);
      });
    });
    describe('Serialization',()=>{
      const expected = {
        type:'System',
        name:testSystem.name,
        id:testSystem.id,
        creation:testSystem.creation,
        children:testSystem.children,
        star:testStar.toJSON(),
        orbit1:testSystem.orbit1,
        spaceFactor:testSystem.spaceFactor,
        outerGiant:testSystem.outerGiant,
        orbits:testSystem.orbits,
        children:testSystem.children,
        starIDs:testSystem.starIDs,
        planetIDs:testSystem.planetIDs
      };
      test('toJSON() should return a JSON string version of the entire system',()=>{
        expect(testSystem.toJSON()).toEqual(expected);
      });
    });
  });
});