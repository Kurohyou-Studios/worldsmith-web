<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useDataStore } from '@/stores';

import { Card,Button } from '@/components';

const dragging = ref('');
const dataStore = useDataStore();
const router = useRouter();
const hasFileSystem = !!window.showDirectoryPicker;
const linkToCloud = (event) => console.log(event);
const forgeRedirect = () => {
  if(dataStore.dirHandle){
    router.push('forge');
  }
};
const dropDirectory = async (event) => {
  dragging.value = '';
  for await(const item of event.dataTransfer.items){
    if(item.kind === 'file'){
      const handle = await item.getAsFileSystemHandle();
      if(handle.kind === 'directory'){
        await dataStore.updateDirectory(handle);
        forgeRedirect();
        break;
      }
    }
  }
};
const browseDirectory = async (event) => {
  await dataStore.chooseDirectory(event);
  forgeRedirect();
};
const dragToggle = (event) => {
  event.type !== 'dragenter' ?
    dragging.value = '' :
    dragging.value = ' dragging'
};
</script>

<template>
<div :class="`flex-box flex-column load-wrapper justify-content-center align-items-center gap-big${dataStore.loading ? ' loading' : ''}`">
  <Card v-if="hasFileSystem" class="card--load">
    <template #title>
      <h3>Setup Your Forge</h3>
    </template>
    <div @drop.prevent="dropDirectory" @dragleave.prevent="dragToggle" @dragenter.prevent="dragToggle" @dragend.prevent="dragToggle" @dragover.prevent :class="`drop-zone${dragging}`">
      <Button @click="browseDirectory" >select your forge</Button>
      <p>or drag and drop a directory here to set it as your forge.</p>
    </div>
    <template #footer>
      <p>Your files in the selected directory will be accessible to Worldsmith for the duration of your browser session. These files will not be sent to any other parties and are not stored after the fact.</p>
    </template>
  </Card>
  <Button disabled @click="linkToCloud">Forge in the Cloud (Coming Soon)</Button>
</div>
</template>

<style lang="scss">
  .load-wrapper{
    padding-top:var(--gap);
    padding-bottom:var(--big-gap);
  }
  .card--load{
    max-width:400px;
    min-width:50%;
    margin-inline:auto;
    background-color: var(--back-color-2);
  }
  .drop-zone{
    aspect-ratio: 2 / 1;
    display:flex;
    flex-direction:column;
    justify-content: space-around;
    align-items: center;
    background-color: var(--back-color-1);
    opacity: 1;
    transition: opacity 500ms ease-in;
    box-shadow:var(--box-shadow-1--base) inset, var(--box-shadow-1--accent) inset;
    &.dragging{
      opacity:0.4;
      > *{
        pointer-events:none;
      }
    }
  }
</style>