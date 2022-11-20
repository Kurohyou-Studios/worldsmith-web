<script setup>
import { nextTick, ref, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { Button, ToolButton, ContextMenu } from '@/components';
import { Project, Planet, System, Star, Galaxy } from '@/stellarClasses';
import { useDataStore } from '@/stores';

const SOs = { Planet, System, Star, Galaxy };

const name = ref(null);
const loading = ref(false);
const edit = ref(false);
const contextual = ref(false);
const {
  data,
  type,
  level,
  content,
  nameProp,
  project,
  system
} = defineProps({
  data: Object,
  level: [Number, String],
  content: String,
  type: String,
  nameProp: String,
  project: Object,
  system: Object
});
console.log('data', data);

const dataStore = useDataStore();
console.log('type', type);
const possibleAdds = {
  Project: ['System', 'Star', 'Planet'],
  System: ['Star', 'Planet'],
  Galaxyy: ['System', 'Star', 'Planet'],
  Star: [],
  Planet: ['Planet']

};
const icons = {
  System: 'life-ring',
  Star: 'sun',
  Galaxy: 'galaxy',
  Planet: 'earth-oceania'
};
const nextLevel = +level > 5 ?
  undefined :
  +level;
const toggleEdit = () => {
  edit.value = !edit.value
  nextTick(() => {
    name.value?.focus();
  });
};
const submitValue = async (event) => {
  if (!name.value) return;
  if (name.value.value !== data[nameProp]) {
    data[nameProp] = name.value.value;
    project.save();
  }
  toggleEdit();
};

const addItem = async (type) => {
  const mySO = new SOs[type]({ name: `New ${type}`, type });
  // debugger;
  data.addChild(mySO);
  await project.save();
};

const removeItem = async () => {
  data.parent?.removeChild(data);
  await project.save();
};

const debounceForClick = function(func,timeout = 250){
  let timer;
  let start;
  return (...args) => {
    start = args[0].detail <= 1 ?
      Date.now() :
      start;
    const end = Date.now();
    clearTimeout(timer);
    timer = setTimeout(()=> {
      if(end - start || args[0].detail <= 1){
        func.apply(this,args);
      }
      start = undefined;
    },timeout);
  };
};

const clickEntry = (event) => {
  if(event.detail <= 1){
    selectEntry(event);
  }else{
    toggleEdit();
  }
};
const debouncedClick = debounceForClick((event)=>clickEntry(event));

const selectEntry = (event) => {
  dataStore.setSelected({
    data,
    project,
    system
  });
};

const openContextMenu = (event) => {
  contextual.value = true;
};

</script>

<template>
  <li :class="`project-entry ${type}${dataStore.loading ? ' loading' : ''}`">
    <span v-if="icons[type]" class="fa-li">
      <FontAwesomeIcon :icon="`fa-solid fa-${icons[type]}`" />
    </span>
    <ContextMenu @click-out="contextual = false" :show="contextual">
      <template #trigger>
        <Button v-if="!edit" class="menu-entry" :role="level ? 'heading' : false" :aria-level="level ? level : false"
          @contextmenu.prevent="openContextMenu" @click="debouncedClick">
          {{ content }}
        </Button>
        <input ref="name" v-else @focus="$event.target.select()" type="text" @keyup.enter="submitValue"
          @blur="submitValue" :value="content">
      </template>
      <li class="right-click-menu-item">
        <Button @click="toggleEdit">
          <FontAwesomeIcon icon="fa-solid fa-pen-fancy" />
          Rename
        </Button>
      </li>
  <li class="right-click-menu-item" v-for="typ in possibleAdds[type]" :key="`${data.id}-${typ}`">
    <Button @click="addItem(typ)" >
      <FontAwesomeIcon :icon="`fa-solid fa-${icons[typ]}`" /> Create {{ typ }}
    </Button>
  </li>
  <li class="right-click-menu-item danger">
    <Button @click="removeItem">
      <FontAwesomeIcon icon="fa-solid fa-circle-xmark"/>
      Delete
    </Button>
  </li>
  </ContextMenu>
  <ul v-if="data.children.length" class="fa-ul">
    <ProjectEntry v-for="obj in data.children" :data="obj" :key="obj.id" :level="nextLevel" :system="obj.type === 'System' ? obj : system" :project="project"
      :type="obj.type" name-prop="name" :content="obj.name || `New ${obj.type}`" />
  </ul>
  </li>
</template>

<style lang="scss">
.danger{
  background-color:var(--danger-color);
}
.right-click-menu-item > button,.menu-entry {
  border: 0px solid transparent;
  background-color: transparent;
  color: inherit;
  padding-block:var(--tiny-gap);
}
.right-click-menu-item > button{
  --gradColor:rgb(0 0 0 / 0.4);
  position:relative;
  overflow:hidden;
  isolation: isolate;
  &:before{
    --gradientJustify: 50%;
    z-index:-1;
    content:'';
    position:absolute;
    top:0;
    bottom:0;
    left:var(--gradientJustify);
    right:var(--gradientJustify);
    justify-self:center;
    transition: {
      property:right,left;
      duration: 500ms;
      timing-function: ease-in-out;
    };
    background: {
      image:linear-gradient(90deg,transparent,var(--gradColor) 35%,var(--gradColor) 65%, transparent);
      position:center;
  };
  }
}
.right-click-menu-item > button:is(:focus,:focus-within,:hover):before{
  --gradientJustify:0%;
}
.right-click-menu-item > button:active:before{
  --gradientJustify:-50%;
}
.project-entry>div {
  display: flex;
  padding-right: var(--half-gap);

  &:first-of-type {
    height: 24px;
  }

  >input {
    flex: 1 1 0;
    width: 0;
    box-sizing:border-box;
  }
}
</style>