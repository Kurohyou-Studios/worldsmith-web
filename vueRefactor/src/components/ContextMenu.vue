<script setup>
import Popper from 'vue3-popper';

const props = defineProps({
  placement: {
    type: String,
    default: 'left-start'
  },
  offset: {
    type: Array,
    default: [0, 16]
  },
  interactive:{
    type:Boolean,
    default:false
  },
  arrow: {
    type:Boolean,
    default:true
  },
  show: Boolean
});
const {
  arrow,
  interactive,
  placement,
  offset
} = props;

defineEmits(['click-out']);

const vClickOff = {
  beforeMount(el,binding){
    el.clickOutsideEvent = (event) => {
      if (el !== event.target && !el.contains(event.target)) {
        // and if it did, call method provided in attribute value
        if(
          event.type !== 'contextmenu' ||
          event.path.every(e => e.nextSibling !== el.parentElement)
        ){
          binding.value();
        }
        
      }
    };
    document.addEventListener('click',el.clickOutsideEvent);
    document.addEventListener('contextmenu',el.clickOutsideEvent);
  },
  beforeUnmount(){
    props.show = false;
  },
  unmounted(el){
    document.removeEventListener('click',el.clickOutsideEvent);
    document.removeEventListener('contextmenu',el.clickOutsideEvent);
  }
}
</script>

<template>
  <Popper :arrow="arrow" :interactive="interactive" :offsetDistance="`${offset[1]}`" :offsetSkid="`${offset[0]}`" v-bind="$attrs" :show="props.show" :placement="placement">
    <slot name="trigger"></slot>
    <template #content>
      <ul v-click-off="(event)=>$emit('click-out',event)" class="context-menu">
        <slot></slot>
      </ul>
    </template>
  </Popper>
</template>

<style lang="scss">
:root{
  --popper-theme-background-color:var(--back-color-1);
  --popper-theme-background-color-hover:var(--popper-theme-background-color);
  --popper-theme-box-shadow:var(--box-shadow-1);
}
#arrow{
  z-index:-1;
}
.context-menu{
  padding:0;
  display:grid;
  > li {
    display:grid;
    > *{
      text-align:left;
    }
  }
}
</style>