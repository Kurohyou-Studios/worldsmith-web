<script setup>
import { useRouter, useRoute, RouterLink, RouterView } from 'vue-router';
import { v1 as uuid } from 'uuid';

import { useDataStore } from '@/stores';

import { Button, ForgeToolbar, ProjectEntry, CreateButton } from '@/components';

import * as editors from '@/components/editors';

import { Project } from '@/stellarClasses';
import { storeToRefs } from 'pinia';
const router = useRouter();
const route = useRoute();
const dataStore = useDataStore();
const buttonRows = [
  [
    { name: 'draw', content: 'button here' }
  ]
];
const createProject = async () => {
  dataStore.$patch({
    loading: true
  });
  try {
    const handle = await window.showSaveFilePicker({
      suggestedName: 'worldBuildingProject',
      types: [{
        description: 'World File',
        accept: { 'text/world': '.world' }
      }]
    });
    const newProj = await Project.connect(handle);
    await newProj.save();
    console.log('newProj', newProj);
  } catch (err) {
    if (err.message !== 'The user aborted a request.') {
      dataStore.$patch({ loading: false });
      return console.error(err);
    }
  }

  await dataStore.updateDirectory();
}

</script>

<template>
  <div class="forge">
    <nav class="forge-nav flex-box flex-column gap-tiny justify-content-center">
      <ForgeToolbar v-for="row in buttonRows" :buttons="row" />
    </nav>
    <nav class="forge-sidebar">
      <ul class="fa-ul">
        <ProjectEntry v-for="obj in dataStore.worlds" :key="obj.id || obj.name" level="4" type="Project" :data="obj"
          :project="obj" name-prop="name" :content="obj.name || 'new project'"></ProjectEntry>
        <li class="cover-marker">
          <CreateButton @click="createProject" />
        </li>
      </ul>
    </nav>
    <Transition name="slide-left">
      <component class="content" v-if="dataStore.selected?.data?.type" :is="editors[`${dataStore.selected?.data?.type}Editor`]" />
    </Transition>
  </div>
</template>

<style lang="scss">
.forge {
  isolation: isolate;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'nav     nav'
    'content sidebar';
  flex: 1 1 auto;
  background-color: var(--back-color-1);
  overflow:hidden;
  >nav {
    background-color: var(--back-color-2);
    box-shadow: var(--basicShadow);
  }

  >.content {
    grid-area: content;
    z-index: -1;
  }
}

.forge-nav {
  grid-area: nav;
  min-height: 30px;
  padding: var(--tiny-gap) var(--half-gap);
}

.forge-sidebar {
  grid-area: sidebar;
  min-width: 13rem;
  width: 20rem;
}

.forge-content {
  display: grid;
  grid-template-areas: 'content';

  >* {
    grid-area: content;
  }
}

.Project {
  &::marker {
    content: 'folder';
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    /* Preferred icon size */
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;

    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;

    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;
  }
}

.cover-marker {
  margin-left: -24px;
  display: flex;
  padding-right: var(--gap);

  button {
    flex: 1 1 auto;
  }
}


</style>