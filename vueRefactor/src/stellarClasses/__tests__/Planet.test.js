import { describe, expect, test } from 'vitest'

import { Planet } from '../Planet.js';
describe('Planet class',()=>{
  describe('Error testing',()=>{
    test('Initializing a Planet without a name or a valid gasPercent object should throw an error',()=>{
      expect(()=>{
        const errorStar = new Planet({});
      })
        .toThrow('The planet needs a name and a gas percentage object');
      expect(()=>{
        const errorStar = new Planet({name:'errorPlanet',gasPercent:{o2:100}});
      })
        .toThrow('The planet needs a name and a gas percentage object');
    });
  });
  describe('Instance operations',()=>{
    const testPlanet = new Planet({name:'Test Planet'});
    
    describe('Serialization',()=>{
      const expected = {
        type:'Planet',
        name:testPlanet.name,
        id:testPlanet.id,
        creation:testPlanet.creation,
        children:{},
        parent:undefined
      };
      test('toJSON() should return a JSON string version of the entire system',()=>{
        expect(JSON.stringify(testPlanet)).toEqual(JSON.stringify(expected));
      });
    });
  });
});