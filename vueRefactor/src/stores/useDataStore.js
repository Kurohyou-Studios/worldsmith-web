import { ref, computed } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

import { Project } from '@/stellarClasses';

const useDataStore = defineStore('data', () => {
  const worlds = ref([]);
  const dirHandle = ref(null);
  const loading = ref(false);
  const scanning = ref(false);
  const project = ref(null);
  const selected = ref(null);
  let maintenanceTimer;
  const getWorlds = async () => {
    try {
      // scanning.value = true;
      const newWorlds = []
      const handleQueue = [dirHandle.value];
      const worker = async (queue) => {
        const checkHandle = queue.shift();
        for await (const [key, handle] of checkHandle.entries()) {
          if (handle.kind === 'directory') {
            queue.push(handle);
          } else if (handle.name.endsWith('.world')) {
            const data = await Project.connect(handle);
            console.log('json', data);
            newWorlds.push(data);
          }
        }
        if (queue.length) {
          return worker(queue);
        }
      };
      await worker(handleQueue);
      worlds.value = newWorlds;
      // scanning.value = false;
      // maintenanceTimer = setTimeout(updateWorlds,1000);
    } catch (err) {
      console.error(err);
    }
  };

  const updateDB = async (handle, data) => {
    loading.value = true;
    const writable = await handle.createWritable();
    await writable.write(JSON.stringify(data, null, 2))
    await writable.close();
    loading.value = false;
  };

  const findWorld = (id) => {
    const idIdx = worlds.value.findIndex(obj => obj.data.id === id);
    return [idIdx, worlds.value[idIdx] || {}];
  }

  const updateWorld = async (id, data) => {
    const [idIdx, world] = findWorld(id);
    if (!(idIdx >= 0)) return;
    const handle = world.handle;
    worlds.value.splice(idIdx, 1, { handle, data });
    await updateDB(handle, data);
  };

  const removeWorld = (id) => {

  };

  const updateDirectory = async (handle) => {
    loading.value = true;
    if (handle) {
      dirHandle.value = handle;
    }
    await getWorlds();
    loading.value = false;
  };

  const chooseDirectory = async (event) => {
    console.log('event', event);
    try {
      loading.value = true;
      const handle = await window.showDirectoryPicker();
      await updateDirectory(handle);
    } catch (err) {
      if (err.message !== 'The user aborted a request.') {
        console.error(err);
      }
    }
    loading.value = false;
  };
  
  const setSelected = (so) => selected.value = so;

  const setProject = (newProject) => project.value = newProject;

  return {
    // values
    worlds,
    dirHandle,
    loading,
    selected,
    project,
    // Methods
    chooseDirectory,
    updateDirectory,
    findWorld,
    updateWorld,
    setSelected,
    setProject
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDataStore, import.meta.hot))
}

export default useDataStore;