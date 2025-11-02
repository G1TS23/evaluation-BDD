<template>
  <div class="flex flex-col items-center justify-center mx-auto mt-20">
    <ArticleList :articles="articles" @deleted="getArticles()"/>
  </div>
</template>
<script setup>
import ArticleList from "@/components/article/ArticleList.vue";
import {onMounted, ref} from "vue";
import {ArticleService} from "@/services/articleService.js";

const articles = ref([]);

onMounted(async () => {
  await getArticles();
});

async function getArticles() {
  articles.value = await ArticleService.getAllArticles();
  console.log(articles);
}
</script>
