<script setup>
import { useDataStore } from '@/stores';
import { SystemDisplay } from '@/components';

const {
  data,
  project
} = defineProps({
  data: Object,
  project: Object
});
const dataStore = useDataStore();


</script>

<template>
<SystemDisplay />
</template>

<style>

</style>