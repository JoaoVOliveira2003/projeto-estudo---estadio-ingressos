<template>
  alo mundo {{ codEvento }}
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
const codEvento = Number(route.params.cod_evento)
console.log(codEvento)
</script>