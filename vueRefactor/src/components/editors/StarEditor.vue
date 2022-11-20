<script setup>
import { ref, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { useDataStore } from '@/stores';

import { SystemDisplay, Card, SaveButton } from '@/components';
const name = ref(null);
const mass = ref(null);
const age = ref(null);
const distance = ref(null);
const angle = ref(null);
const inclination = ref(null);

const starProps = [
  ['luminosity','Lsol'],
  ['radius','Rsol'],
  ['temperature','K'],
  ['density','Dsol'],
  ['class']
];

const basics = {
  name,
  mass,
  age,
  distance,
  angle,
  inclination,
};

const dataStore = useDataStore();
const { selected: { data, project, system } } = dataStore;

const submitDetails = () => project.save();
const handleInput = (prop) => {
  data[prop] = basics[prop].value.value;
};

</script>

<template>
  <div class="star-editor">
    <form @submit.prevent="submitDetails">
      <Card class="star-basics">
        <template #title>
          <h2>Star Details</h2>
          <SaveButton type="submit" />
        </template>
        <fieldset class="flex-box gap-half">
          <label for="name">Name</label>
          <input @input="handleInput('name')" type="text" id="name" :value="data.name" name="star_name" ref="name">
        </fieldset>
        <fieldset class="flex-box gap-half">
          <label for="mass">Mass</label>
          <input @input="handleInput('mass')" type="number" id="mass" :value="data.mass" name="star_mass" ref="mass">
          <span class="unit">Msol</span>
        </fieldset>
        <fieldset>
          <label for="age">Age</label>
          <input @input="handleInput('age')" type="number" id="age" :value="data.age" name="star_age" ref="age">
          <span class="slash">/</span>
          <span class="max">{{ data.maxAge }}</span>
          <span class="unit">Gyr</span>
        </fieldset>
        <fieldset v-if="system.stars.length > 1" class="flex-box gap-half">
          <label for="distance">Distance</label>
          <input @input="handleInput('distance')" type="number" id="distance" :value="data.distance" name="star_distance" ref="distance">
          <span class="unit">AU</span>
        </fieldset>
        <fieldset v-if="system.stars.length > 1" class="flex-box gap-half">
          <label for="eccentricity">Eccentricity</label>
          <input @input="handleInput('eccentricity')"
            ref="eccentricity"
            type="number"
            id="eccentricity"
            :value="data.eccentricity"
            name="star_eccentricity"
            min="0"
            max="1">
        </fieldset>
        <fieldset v-if="system.stars.length > 1" class="flex-box gap-half">
          <label for="angle">Angle</label>
          <input @input="handleInput('angle')" type="number" id="angle" :value="data.angle" name="star_angle" ref="angle">
          <span class="unit">deg</span>
        </fieldset>
        <fieldset v-if="system.stars.length > 1" class="flex-box gap-half">
          <label for="inclination">Inclination</label>
          <input @input="handleInput('inclination')" type="number" id="inclination" :value="data.inclination" name="star_inclination" ref="inclination" min="0" max="360">
          <span class="unit">deg</span>
        </fieldset>
      </Card>
    </form>
    <SystemDisplay />
    <Card class="star-details">
      <template #title>
        <h3>Calculated Values</h3>
      </template>
      <div v-for="prop in starProps" :key="prop[0]" class="flex-box gap-half">
        <span class="capitalize">{{ prop[0] }}</span>
        <span>{{ data[prop[0]] }}</span>
        <span v-if="prop[1]" class="unit">{{ prop[1] }}</span>
      </div>
      <div class="flex-box gap-half">
        <span class="capitalize">Color</span>
        <span class="color-display" :style="{backgroundColor:`rgb(${data.color.red} ${data.color.blue} ${data.color.green})`}"></span>
      </div>
    </Card>
  </div>
</template>

<style lang="scss">
.star-editor {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-auto-flow: dense;
  gap: var(--gap);
  padding: var(--big-gap);
  align-items: start;
  align-content: start;
  .color-display{
    width:3rem;
  }
  > .star-details{
    grid-column:1 / -1;
    > .card__content{
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
    }
  }
  >.system-display {
    grid-column-end: -1;
  }
}
</style>