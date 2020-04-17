<template>
  <v-card>
    <v-card-title>Info</v-card-title>
    <v-card-text>
      This is a smol text de-/encoder designed to be similar to Burps Decoder-Tab. It's made using
      <a target="_blank" href="https://vuejs.org/">Vue</a> (and its
      <a target="_blank" href="https://github.com/vuejs/composition-api">composition API</a>),
      <a target="_blank" href="https://vuetifyjs.com/">Vuetify</a>,
      <a target="_blank" href="https://www.typescriptlang.org/">Typescript</a>,
      <a target="_blank" href="https://github.com/nodeca/pako">Pako</a>, and
      <a target="_blank" href="https://github.com/feross/buffer">Buffer</a>.
      <p />
      <v-btn outlined href="https://github.com/Nerixyz" target="_blank">
        <v-icon>mdi-github</v-icon>
        GitHub
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import { defineComponent } from '@vue/composition-api';

  export default defineComponent<{ visible: boolean }>({
    name: 'Info',
  });
</script>

<style scoped></style>
