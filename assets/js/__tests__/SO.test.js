import { SO } from '../SO.js';

describe('Base stellar object class',()=>{
  test('Initializing without a name should throw an error',()=>{
    expect(()=>{
      new SO();
    })
      .toThrow('All Stellar Objects must have a name');
  });

  const testName = 'Test SO';
  const testSO = new SO(testName);
  test('It should be initialized with an id, name, and creation date, and an array of these properties as serializable.',()=>{

    expect(testSO.name).toEqual(testName);
    expect(testSO.id).toBeTruthy();
    expect(testSO.creation).toBeTruthy();
    expect(testSO.serial).toEqual(['type','name','id','creation'])
  });
  test('Changing the star statistics should update the system.',()=>{
    expect(testSO.emit()).toEqual('No parent defined');
  });
  describe('serialization',()=>{
    const expected = {
      type:'unspecified',
      name:testSO.name,
      id:testSO.id,
      creation:testSO.creation
    };
    test('Calling SO.toObject() should return an object version of the world',()=>{
      expect(testSO.toObject()).toEqual(expected);
    });
    test('toJSON() should return a JSON string version of the entire system',()=>{
      expect(testSO.toJSON()).toEqual(JSON.stringify(expected));
    })
  })
  // test.todo('Calling SO.toYAML() should return a YAML string version of the world',()=>{
  //   const expected = {
  //     name:testSO.name
  //   };

  //   const obj = yaml.load(testSO.toYAML());

  //   expect(obj).toEqual(expected);
  // });
  // test.todo('Calling SO.toWSmith() should return a WorldSmith google sheet version of the SO');
  // test.todo('Calling SO.json(worldObj) should return a newly instantiated world using the JSON object as base',()=>{
  //   const expected = {
  //     name:testSO.name,
  //     creation:testSO.creation,
  //     galaxies:[]
  //   };

  //   const upUni = SO.json(expected);

  //   expect(upUni.name).toEqual(expected.name);
  //   expect(upUni.creation).toEqual(expected.creation);
  //   expect(upUni.galaxies).toEqual(expected.galaxies);
  // });
  // test.todo('Calling SO.yaml(worldObj) should return a newly instantiated world using the YAML string as a base',()=>{
  //   const expected = {
  //     name:testSO.name,
  //     creation:testSO.creation,
  //     galaxies:[]
  //   };

  //   const upUni = SO.yaml(expected);

  //   expect(upUni.name).toEqual(expected.name);
  //   expect(upUni.creation).toEqual(expected.creation);
  //   expect(upUni.galaxies).toEqual(expected.galaxies);
  // });
  // test.todo('Calling SO.wSmith(worldObj) should return a newly instantiated world using the indicated Worldsmith page as a base');
})