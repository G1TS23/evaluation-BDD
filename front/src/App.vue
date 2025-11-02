<script setup>
import {onMounted} from 'vue'
import {AuthService} from "@/services/authService.js";
import NavBar from "@/components/NavBar.vue";

onMounted(async () => {
  AuthService.getUser();
});
</script>

<template>
  <NavBar/>
  <RouterView/>
</template>

<style scoped></style>
