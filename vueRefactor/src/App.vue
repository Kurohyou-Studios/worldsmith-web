<script setup>
import { Transition } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { Header, Footer } from '@/components';
import { useDataStore } from '@/stores';
const dataStore = useDataStore();
</script>

<template>
  <Header />
  <main>
      <RouterView v-slot="{ Component }">
        <Transition name="fade">
          <component :is="Component" />
        </Transition>
      </RouterView>
  </main>
  <Footer />
</template>

<style lang="scss">
body,
#app{
  height:100vh;
  margin:0;
}
main{
  flex:1 1 auto;
  display:grid;
  grid-template-areas:'content';
  > * {
    grid-area:content;
  }
}
</style>
