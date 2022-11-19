<script setup>
import { MainNav } from '@/components';
</script>

<template>
  <header class="site-header">
    <h1>Worldsmith Web</h1>
    <MainNav />
  </header>
</template>

<style>
.site-header{
  display:flex;
  justify-content: space-between;
  gap:var(--gap);
  padding:var(--gap) var(--half-gap);
  background-color:var(--back-color-2);
  box-shadow:var(--box-shadow-1);
}
</style>