<template>
  <q-layout view="lHh Lpr lFf">

    <q-btn
      flat dense round icon="menu"
      class="drawer-toggle-btn"
      @click="drawer = !drawer"
    />

    <q-drawer v-model="drawer" show-if-above bordered :width="240" class="bg-grey-1">
      <q-list padding>
        <q-item-label header class="text-grey-7">
          Navegação
        </q-item-label>

        <q-item clickable v-ripple to="/">
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>
            Sei lá
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const drawer = ref(false)
</script>

<style scoped>
.drawer-toggle-btn {
  position: fixed;
  top: 8px;
  right: 8px;
  z-index: 3000; /* acima do drawer pra sempre ficar clicável */
  background: white;
}
</style>