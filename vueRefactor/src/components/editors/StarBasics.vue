<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { useDataStore } from '@/stores';

import { SaveButton } from '@/components';

const dataStore = useDataStore();
const name = ref(null);
const distance = ref(null);
const { star } = defineProps({ star:Object });
const editStar = (event) =>{
  const nameVal = name?.value?.value;
  const distanceVal = distance?.value.value;
  let changed = false;
  if(nameVal && nameVal !== star.name){
    star.name = nameVal;
    changed = true;
  }
  if(distanceVal && distanceVal !== star.distance){
    star.distance = distanceVal;
    changed = true;
  }
  if(changed){
    dataStore.selected.project.save();
  }
}
</script>

<template>
  <form @submit.prevent="editStar">
    <fieldset>
      <label :for="`star-name-${star.id}`">Name</label>
      <input ref="name" :id="`star-name-${star.id}`" type="text" :value="star.name" />
    </fieldset>
    <fieldset>
      <label :for="`star-class-${star.id}`">Star Class</label>
      <span :id="`star-class-${star.id}`">{{ star.class }}</span>
    </fieldset>
    <fieldset>
      <label :for="`star-distance-${star.id}`">Distance from Barycentre</label>
      <input ref="distance" :id="`star-distance-${star.id}`" type="number" :value="star.distance">
    </fieldset>
    <SaveButton type="submit" />
  </form>
</template>

<style>

</style>