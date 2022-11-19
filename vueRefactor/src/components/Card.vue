<script setup>
import { useSlots } from 'vue';
const slots = useSlots();
</script>

<template>
<div class="card">
  <div v-if="slots.title" class="card__title">
    <slot class="card__title__heading" name="title"></slot>
  </div>
  <div v-if="slots.default" class="card__content">
    <slot></slot>
  </div>
  <div v-if="slots.footer" class="card__footer">
    <slot name="footer"></slot>
  </div>
</div>
</template>

<style lang="scss">
.card{
  border-radius:10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  padding: var(--gap);
}
</style>