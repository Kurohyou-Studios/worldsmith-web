import { Project } from '../Project.js';
import yaml from 'js-yaml';
describe('Project class',()=>{
  test('Initializing a world without a name should throw an error',()=>{
    expect(()=>{
      const errorWorld = new Project();
    })
      .toThrow('Invalid Project Name');
  });
  const testName = 'Test Project';
  const testProject = new Project(testName);
  test('A newly created project should be initialized with a name, creation date, and empty children array',()=>{
    expect(testProject.name).toEqual('Test Project');
    expect(testProject.creation).toBeTruthy();
    expect(testProject.children.length).toEqual(0);
    expect(testProject.serial).toEqual(['type','name','id','creation','children']);
  });
});