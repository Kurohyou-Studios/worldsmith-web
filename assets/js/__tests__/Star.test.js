import { Star } from '../Star.js';
import { colorTemperature2rgb as cTemp } from '../colortemp.js';

describe('Star class',()=>{
  describe('Static Methods',()=>{
    test('Star.calcRadius() should return the radius of the star based on the mass',()=>{
      const mass = 1;//mSol masses
      const radius = Star.calcRadius(mass);
  
      expect(radius).toEqual(1);
    });
    test('Star.calcMaxAge() should return the maximum age of the star based on the mass',()=>{
      const mass = 1;//mSol masses
      const luminosity = 1;
      const maxAge = Star.calcMaxAge(mass,luminosity);
  
      expect(maxAge).toEqual(10);
    });
    test('Star.calcLuminosity() should return the luminosity of the star based on the mass',()=>{
      const mass = 1;//mSol masses
      const luminosity = Star.calcLuminosity(mass);
  
      expect(luminosity).toEqual(1);
    });
    test('Star.calcDensity() should return the density of the star based on the mass and radius',()=>{
      const mass = 1;//mSol masses
      const radius = 1; //sol radius
      const density = Star.calcDensity(mass,radius);
  
      expect(density).toEqual(1);
    });
    test('Star.calcTemperature() should return the effective temperature of the star based on mass, radius, and luminosity',()=>{
      const mass = 1;//mSol masses
      const radius = 1; //sol radius
      const luminosity = 1; //sol radius
      const temp = Star.calcTemperature(mass,radius,luminosity);

      expect(temp).toEqual(5776);
    });
    test('Star.calcColor() should return the apparent color of the star based on temperature',()=>{
      const temp = 5776;
      const expected = cTemp(5776);
      const color = Star.calcColor(temp);
  
      expect(color).toEqual(expected);
    });
    test('Star.calcHabZone() should return the radius of the star based on the mass and luminosity',()=>{
      const mass = 1;//mSol masses
      const luminosity = 1;
      const expected = [0.953,1.374];
      const radius = Star.calcHabZone(mass,luminosity);
  
      expect(radius).toEqual(expected);
    });
    test('Star.isEarth() should return the radius of the star based on the mass',()=>{
      const mass = 1;//mSol masses
      const age = 4.5;

      const isEarth = Star.isEarth(mass,age);
  
      expect(isEarth).toEqual('Yes');
    });
    test('Star.calcClass() should return the class of the star based on temperature',()=>{
      const temperature = 5776;
      const expected = 'G2.8V';

      const sClass = Star.calcClass(temperature);

      expect(sClass).toEqual(expected);
    });
  });
  describe('Instance operations',()=>{
    test('Initializing a Star without a name should throw an error',()=>{
      expect(()=>{
        const errorStar = new Star();
      })
        .toThrow('A new star must have a name, mass, and age.');
    });
    const testName = 'Test Star';
    const testAge = 4.5;
    const testMass = 1;
    const testStar = new Star(testName,testMass,testAge);
    test('Attempting to set a custom property or update a calc only property on a created Star should throw an error',()=>{
      expect(()=>{
        testStar.class = 'Class is calc only';
      })
        .toThrow('Cannot set property class of #<Star> which has only a getter');
    });
    test('A newly created star should be initialized with a name, creation date, and all the calculated properties of the star.',()=>{
  
      // Passed values
      console.log('luminosity',testStar.luminosity);
      expect(testStar.name).toEqual(testName);
      expect(testStar.mass).toEqual(testMass);
      expect(testStar.age).toEqual(testAge);
      expect(testStar.serial).toEqual(['type','name','id','creation','mass','age']);
      // Star calculated Properties
      expect(testStar.maxAge).toEqual(10);
      expect(testStar.creation).toBeTruthy();
      expect(testStar.id).toBeTruthy();
      expect(testStar.class).toEqual('G2.8V');
      expect(testStar.radius).toEqual(1);
      expect(testStar.luminosity).toEqual(1);
      expect(testStar.density).toEqual(1);
      expect(testStar.temperature).toEqual(5776);
      expect(testStar.color).toEqual(cTemp(5776));
      expect(testStar.habZone).toEqual([0.953,1.374]);
      expect(testStar.earth).toEqual('Yes');
    });
    describe('Methods',()=>{
      test('isHabitable should return true/false based on if the indicated au is in the habitable zone of the star',()=>{
        const habAU = 1;
        const inhabAU = 2;
  
        expect(testStar.isHabitable(habAU)).toEqual(true);
        expect(testStar.isHabitable(inhabAU)).toEqual(false);
      });
    });
    describe('Serialization',()=>{
      const expected = {
        type:'Star',
        name:testStar.name,
        id:testStar.id,
        creation:testStar.creation,
        mass:testStar.mass,
        age:testStar.age
      };
      test('toObject() should return a nested object version of the entire system, including all stellar objects',()=>{
        expect(testStar.toObject()).toEqual(expected);
      });
      test('toJSON() should return a JSON string version of the entire system',()=>{
        expect(testStar.toJSON()).toEqual(JSON.stringify(expected));
      });
    });
  });
})