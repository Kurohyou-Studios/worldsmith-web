
import { connectDB } from '@/database';
import { useDataStore } from '@/stores';
import * as stellar from './index';
import { SO } from './index';

// Class to represent the overall world that is created.
/**
 * A class to represent the world to be worked on
 */
export class Project extends SO {
  /**
   * Constructs the Universe
   * @param {string} name - The name of the Project
   */
  db;
  constructor({ name, db, creation, id }) {
    if (!name || typeof name !== 'string') {
      const err = new Error('Invalid Project Name');
      throw err;
    }
    if (!db) {
      const err = new Error('Projects must be connected to a database');
      throw err;
    }
    super(name, 'Project', creation, id);
    this.db = db;
  }

  save() {
    const dataStore = useDataStore();
    const worldIndex  = dataStore.worlds.findIndex(project => project.id === this.id);
    
    dataStore.worlds.splice(worldIndex,1,this);
    this.db.data = this.toJSON();
    return this.db.write();
  }

  static #initChildren(children, instance) {
    children.forEach((child) => {
      const childInstance = new stellar[child.type](child);
      instance.addChild(childInstance);
      Project.#initChildren(child.children,childInstance);
    });
  }

  static async connect(handle) {
    const db = connectDB(handle);
    await db.read();
    const data = db.data;
    console.log('data',data);
    const proj = new Project({ ...data, handle, db });
    Project.#initChildren(data.children,proj);
    return proj;
  }
}