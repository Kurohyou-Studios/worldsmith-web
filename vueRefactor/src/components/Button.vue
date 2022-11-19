<script setup>
const props = defineProps({
    text: String,
    color: String
});
defineEmits(['button-click']);
</script>
<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>