import { createRouter, createWebHistory } from 'vue-router';
import { computed } from 'vue';

import { Home, Load, Forge, Settings } from '@/views';
import { useDataStore } from '@/stores';

export const initRouter = ()=>{
  const dataStore = useDataStore();
  return createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/load',
        name: 'load',
        component: Load
      },
      {
        path: '/forge',
        name: 'forge',
        component: Forge,
        beforeEnter(to,from){
          if(!dataStore.dirHandle){
            return {name:'load'};
          }
        },
        // children:[
        //   {
        //     path:'system/:systemID'
        //   }
        // ]
      },
      {
        path: '/settings',
        name: 'settings',
        component: Settings
      },
    ]
  });
}