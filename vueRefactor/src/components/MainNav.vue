<script setup>
import { useDataStore } from '@/stores';
import { RouterLink, useRoute } from 'vue-router';
const route = useRoute();
const dataStore = useDataStore();
console.log('route',route);
</script>

<template>
  <nav class="main-nav">
    <ul>
      <li>
        <RouterLink v-if="dataStore.dirHandle" class="text-4 hover-expand"  to="/forge" title="forge">
          <span class="material-icons">handyman</span>
          <span class="full-text">forge</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink class="text-4 hover-expand"  to="/load" title="Load Files">
          <span class="material-icons">file_upload</span>
          <span class="full-text">load</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/settings" class="text-4 hover-expand" title="Settings">
          <span class="material-icons">settings</span>
          <span class="full-text">settings</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
nav li{
  list-style:none;
}
nav a{
  text-transform:capitalize;
}
.main-nav > ul{
  margin:0;
  display:flex;
  gap:var(--gap);
  padding-inline:var(--big-gap);
  align-items:center;
}
</style>