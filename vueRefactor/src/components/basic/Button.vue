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

<style lang="scss">
.btn {
  background-color: transparent;
  color: var(--normal-color);
  border: 0px;

  &>.svg-inline--fa {
    font-size: 150%;
  }
}
</style>