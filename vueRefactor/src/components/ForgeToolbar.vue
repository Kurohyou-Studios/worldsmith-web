<script setup>
import { ToolButton } from '@/components';

import { useToolStore } from '@/stores';

const props = defineProps({
  buttons:Array
});
</script>

<template>
<ul class="toolbar">
  <li v-for="button in props.buttons" :key="button.name">
    <ToolButton :name="button.name" @click="button.click">
      {{button.content}}
    </ToolButton>
  </li>
</ul>
</template>

<style lang="scss">
.toolbar {
  display:flex;
  gap:var(--gap);
  margin:0;
  flex-wrap:wrap;
  padding-left:0;
  align-items
  li {
    list-style:none;
  }
}
</style>