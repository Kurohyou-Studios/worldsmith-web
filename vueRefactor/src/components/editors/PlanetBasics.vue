<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { useDataStore } from '@/stores';

import { SaveButton } from '@/components';

const dataStore = useDataStore();
const name = ref(null);
const distance = ref(null);
const { planet } = defineProps({ planet:Object });
const editPlanet = (event) =>{
  const nameVal = name?.value?.value;
  const distanceVal = distance?.value.value;
  let changed = false;
  if(nameVal && nameVal !== planet.name){
    planet.name = nameVal;
    changed = true;
  }
  if(distanceVal && distanceVal !== planet.distance){
    planet.distance = distanceVal;
    changed = true;
  }
  if(changed){
    dataStore.selected.project.save();
  }
}
</script>

<template>
  <form @submit.prevent="editPlanet">
    <fieldset>
      <label :for="`planet-name-${planet.id}`">Name</label>
      <input ref="name" :id="`planet-name-${planet.id}`" type="text" :value="planet.name" />
    </fieldset>
    <fieldset>
      <label :for="`planet-mass-${planet.id}`">Mass</label>
      <span :id="`planet-mass-${planet.id}`">{{ planet.mass }}</span>
    </fieldset>
    <fieldset>
      <label :for="`planet-distance-${planet.id}`">Distance from Barycentre</label>
      <input ref="distance" :id="`planet-distance-${planet.id}`" type="number" :value="planet.distance">
    </fieldset>
    <SaveButton type="submit" />
  </form>
</template>

<style>

</style>