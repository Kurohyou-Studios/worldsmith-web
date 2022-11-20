<script setup>
import { Card } from '@/components';

const {
  system,
  selected
} = defineProps({
  system: Object,
  selected: Object
});

</script>

<template>
<Card class="system-display">
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