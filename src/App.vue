<template>
  <v-app>
    <v-app-bar app clipped-left>
      <v-toolbar-title>TextTools</v-toolbar-title>
      <v-spacer />
      <v-btn icon color="primary" class="mr-1" @click="showInfo">
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid>
        <Editor />
      </v-container>
    </v-content>

    <v-snackbar v-model="showCookies" multi-line :timeout="0">
      This Website uses Cookies.
      <v-btn color="primary" text @click="acceptCookies">
        I'm ok with that
      </v-btn>
    </v-snackbar>

    <v-dialog v-model="infoIsShown" max-width="500">
      <Info v-model="infoIsShown" />
    </v-dialog>
  </v-app>
</template>

<script lang="ts">
  import { defineComponent, ref } from '@vue/composition-api';
  import Editor from '@/components/Editor.vue';
  import Info from '@/components/Info.vue';

  export default defineComponent({
    name: 'App',
    components: {
      Editor,
      Info,
    },
    setup() {
      const showCookies = ref(!localStorage.getItem('cookiesAccepted'));
      const acceptCookies = () => {
        showCookies.value = false;
        localStorage.setItem('cookiesAccepted', 'true');
      };
      const infoIsShown = ref(false);
      const showInfo = () => (infoIsShown.value = true);
      return {
        showCookies,
        acceptCookies,
        infoIsShown,
        showInfo,
      };
    },
  });
</script>

<style></style>
