<script setup>
import { ref, computed } from 'vue';

import { useDataStore } from '@/stores';

import { SystemDisplay, Card, Button, CreateButton, SaveButton } from '@/components';
import * as SOs from '@/stellarClasses';
import StarBasics from './StarBasics.vue';
import PlanetBasics from './PlanetBasics.vue';

const name = ref(null);
const dataStore = useDataStore();
const { selected: { data, project, system } } = dataStore;
const submitBasics = (event) => {
  if (!name.value) return;
  if (name.value.value !== project.name) {
    project.name = name.value.value;
    project.save();
  }
}
const stars = computed(() => {
  return dataStore
    .selected
    .data
    .children
    .filter(child =>
      dataStore
        .selected
        .data
        .starIDs
        .includes(child.id)
    );
});
const planets = computed(() => {
  return dataStore
    .selected
    .data
    .children
    .filter(child =>
      dataStore
        .selected
        .data
        .planetIDs
        .includes(child.id)
    );
});

const addItem = async (type) => {
  const mySO = new SOs[type]({ name: `New ${type}`, type });
  data.addChild(mySO);
  await project.save();
}
</script>

<template>
  <div class="system-editor">
    <form @submit.prevent="submitBasics">
      <Card class="basic-stats">
        <template #title>
          <h2>{{ data.name }}</h2>
          <SaveButton type="submit" />
        </template>
        <fieldset>
          <label for="name">System Name</label>
          <input id="name" type="text" name="project_name" ref="name" :value="data.name" />
        </fieldset>
        <fieldset>
          <label for="spacing">Spacing factor</label>
          <input id="spacing" type="number" name="spacing" ref="spacing" :value="data.spaceFactor" />
        </fieldset>
      </Card>
    </form>

    <SystemDisplay />
    <Card class="system-stars">
      <template #title>
        <h3>Stars in System</h3>
        <div class="center-button">
          <CreateButton @click="addItem('Star')" />
        </div>
      </template>
      <ul>
        <li v-for="star in stars" :key="star.id">
          <StarBasics :star="star" />
        </li>
      </ul>
    </Card>
    <Card class="system-planets">
      <template #title>
        <h3>Planets in System</h3>
        <div class="center-button">
          <CreateButton @click="addItem('Planet')" />
        </div>
      </template>
      <ul>
        <li v-for="planet in planets" :key="planet.id">
          <PlanetBasics :planet="planet" />
        </li>
      </ul>
    </Card>
  </div>
</template>

<style lang="scss">
.system-editor {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-auto-flow: dense;
  gap: var(--gap);
  padding: var(--big-gap);
  align-items: start;
  align-content: start;
  justify-content: center;

  >.system-display {
    grid-column-end: -1;
  }
}

.system-stars {
  grid-column: 1
}
</style>