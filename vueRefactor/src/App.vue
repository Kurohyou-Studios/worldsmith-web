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
        <Transition name="route">
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


@media not (prefers-reduced-motion){
  .route-enter-active,
  .route-leave-active{
    transition: {
      property: opacity;
      duration:1s;
    };
  }
  .route-enter-active{
    transition-timing-function: ease-in;
  }
  .route-leave-active{
    transition-timing-function:ease-out;
  }
  .route-enter-from,
  .route-leave-to{
    opacity:0;
  }
  .route-enter-to,
  .route-leave-from{
    opacity:1;
  }
}
</style>
