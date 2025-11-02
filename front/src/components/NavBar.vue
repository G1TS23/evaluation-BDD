<template>
  <div class="w-full bg-amber-900 text-white fixed top-0">
    <div class="flex w-4/5 items-center justify-between m-auto p-3">
      <div class="flex items-center justify-start gap-4">
        <h1 class="font-semibold text-xl font-bold leading-tight">BLOG</h1>
        <RouterLink to="/" :class="linkClass('/', true)">
          Articles récents
        </RouterLink>
        <RouterLink to="/articles" :class="linkClass('/articles')">
          Tous les articles
        </RouterLink>
        <RouterLink to="/add-article" :class="linkClass('/add-article', true)">
          Ajouter un article
        </RouterLink>
      </div>
      <div class="flex items-center justify-end gap-4">
        <label>Utilisateur </label>
        <select @change="selectUser" v-model="user.userID">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {AuthService} from "@/services/authService.js";
import {useUserStore} from "@/stores/user.js";

const route = useRoute();

function linkClass(path, exact = false) {
  const base = "cursor-pointer rounded-md hover:bg-amber-800 p-2";
  const active = "cursor-pointer rounded-md bg-amber-800 p-2";
  if (exact) {
    return route.path === path ? active : base;
  }
  return route.path.startsWith(path) ? active : base;
}

function selectUser(event) {
  localStorage.clear();
  AuthService.setUser(event.target.value);
}

const user = useUserStore();
</script>

<style scoped></style>
