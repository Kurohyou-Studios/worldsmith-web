import { Universe } from '../Universe.js';
import yaml from 'js-yaml';
describe('Universe class',()=>{
  test('Initializing a world without a name should throw an error',()=>{
    expect(()=>{
      const errorWorld = new Universe();
    })
      .toThrow('Invalid Universe Name');
  });
  const testName = 'Test Universe';
  const testUniverse = new Universe(testName);
  test('Attempting to set a custom property on a created Universe should throw an error',()=>{
    expect(()=>{
      testUniverse.customProp = 'should not happen';
    })
      .toThrow('Cannot add property customProp, object is not extensible');
  });
  test('A newly created world should be initialized with a name, creation date, and empty galaxy array',()=>{
    expect(testUniverse.name).toEqual('Test Universe');
    expect(testUniverse.creation).toBeTruthy();
    expect(testUniverse.galaxies.length).toEqual(0);
  });
  test('Calling Universe.toJSON() should return a JSON string version of the world',()=>{
    const expected = {
      name:testUniverse.name,
      creation:testUniverse.creation,
      galaxies:[]
    };
    const obj = JSON.parse(testUniverse.toJSON());

    expect(obj).toEqual(expected);
  });
  test('Calling Universe.toYAML() should return a YAML string version of the world',()=>{
    const expected = {
      name:testUniverse.name,
      creation:testUniverse.creation,
      galaxies:[]
    };

    const obj = yaml.load(testUniverse.toYAML());

    expect(obj).toEqual(expected);
  });
  test.todo('Calling Universe.toWSmith() should return a WorldSmith google sheet version of the Universe');
  test('Calling Universe.json(worldObj) should return a newly instantiated world using the JSON object as base',()=>{
    const expected = {
      name:testUniverse.name,
      creation:testUniverse.creation,
      galaxies:[]
    };

    const upUni = Universe.json(expected);

    expect(upUni.name).toEqual(expected.name);
    expect(upUni.creation).toEqual(expected.creation);
    expect(upUni.galaxies).toEqual(expected.galaxies);
  });
  test('Calling Universe.yaml(worldObj) should return a newly instantiated world using the YAML string as a base',()=>{
    const expected = {
      name:testUniverse.name,
      creation:testUniverse.creation,
      galaxies:[]
    };

    const upUni = Universe.yaml(expected);

    expect(upUni.name).toEqual(expected.name);
    expect(upUni.creation).toEqual(expected.creation);
    expect(upUni.galaxies).toEqual(expected.galaxies);
  });
  test.todo('Calling Universe.wSmith(worldObj) should return a newly instantiated world using the indicated Worldsmith page as a base');
});