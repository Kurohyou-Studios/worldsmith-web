import { beforeAll, describe, expect, test } from 'vitest'
import {v1 as uuid } from 'uuid';

import { Project, Planet, Star, System } from '@/stellarClasses';
import yaml from 'js-yaml';

// File mock
let testProjectData = {
  name:'Test Project',
  id: uuid(),
  children:{}
};

const mockHandle = {
  name:'test-project.world',
  kind:'file',
  async getFile(){
    return new Promise(res => res({
      async text(){
        return new Promise(r => r(JSON.stringify(testProjectData,null,2)))
      }
    }))
  },
  async createWritable(){
    return new Promise(res => res({
      async write(dataString){
        testProjectData = JSON.parse(dataString);
        return new Promise(r => r(undefined));
      },
      async close(){
        return new Promise(r => r(undefined));
      }
    }));
  }
}
describe('Project class',()=>{
  test('Initializing without a name should throw an error',()=>{
    expect(()=>{
      const errorWorld = new Project({});
    })
      .toThrow('Invalid Project Name');
  });
  let testProject;
  beforeAll(async ()=>{
    testProject = await Project.connect(mockHandle);
  });
  test('A newly created project should be initialized with a name, creation date, and empty children array',()=>{
    expect(testProject.name).toEqual('Test Project');
    expect(testProject.creation).toBeTruthy();
    expect(Object.keys(testProject.children).length).toEqual(0);
    expect(testProject.serial).toEqual(['type','name','id','creation','children']);
  });

});