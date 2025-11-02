<template>
  <div class="flex flex-col items-center justify-center mx-auto mt-20">
    <ArticleList :articles="recentArticles" @deleted="getArticles()"/>
  </div>
</template>
<script setup>
import ArticleList from "@/components/article/ArticleList.vue";
import {onMounted, ref} from "vue";
import {ArticleService} from "@/services/articleService.js";

const recentArticles = ref([]);

onMounted(async () => {
  await getArticles();
});

async function getArticles() {
  recentArticles.value = await ArticleService.getRecentArticles();
  console.log(recentArticles.value);
}
</script>
