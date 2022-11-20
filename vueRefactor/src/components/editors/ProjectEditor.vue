<script setup>
import { ref } from 'vue';
import { useDataStore } from '@/stores';
import { SystemDisplay, Card, Button } from '@/components';
const name = ref(null);
const {
  data,
  project
} = defineProps({
  data: Object,
  project: Object
});
const dataStore = useDataStore();

const handleFormSubmit = (event) => {
  if(!name.value) return;
  if ( name.value.value !== dataStore.selected.project.name){
    dataStore.selected.project.name = name.value.value;
    dataStore.selected.project.save();
  }
}
</script>

<template>
<div class="project-editor">
  <Card>
    <template #title>
      <h2>{{ dataStore.selected.data.name }}</h2>
    </template>
    <form @submit.prevent="handleFormSubmit">
      <input type="text" name="project_name" ref="name" :value="dataStore.selected.data.name" />
      <Button type="submit">Submit</Button>
    </form>
  </Card>
</div>
</template>

<style lang="scss">
.project-editor{
  display:grid;
  grid-template-columns:minmax(1fr,300px);
  grid-template-rows:minmax(1fr,300px);
  place-content:start center;
  padding-top:var(--big-gap);
}
</style>