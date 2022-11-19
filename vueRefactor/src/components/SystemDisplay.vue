<script setup>
import Card from './Card.vue';
const {
  system,
  selected
} = defineProps({
  system: Object,
  selected: Object
});

</script>

<template>
<Card>
  <template #title>
    <h3>Planetary System Map</h3>
  </template>
  <div class="system-preview">
    
  </div>
  <template #footer>

  </template>
</Card>
</template>

<style>

</style>