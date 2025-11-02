<template>
  <div v-for="article in articles" :key="getId(article)">
    <ArticleItem :article="article" @deleted="$emit('deleted')"/>
    <CommentList :comments="commentsMap[getId(article)] || []" @deleted="$emit('deleted')"/>
  </div>
</template>

<script setup>
import ArticleItem from "@/components/article/ArticleItem.vue";
import CommentList from "@/components/comment/CommentList.vue";
import {CommentService} from "@/services/commentService.js";
import {onMounted, reactive, watch} from 'vue';

const props = defineProps(['articles']);
const emit = defineEmits(['deleted']);

const commentsMap = reactive({});

function getId(article) {
  return article?.id_article ?? article?.article_id;
}

async function loadCommentsFor(article) {
  const id = getId(article);
  if (!id) return;
  if (commentsMap[id]) return; // déjà chargé
  try {
    commentsMap[id] = await CommentService.getCommentByArticleId(id);
  } catch (e) {
    commentsMap[id] = []; // fallback
    console.error('Erreur load comments', e);
  }
}

onMounted(() => {
  props.articles?.forEach(loadCommentsFor);
});

watch(() => props.articles, (newArticles) => {
  newArticles?.forEach(loadCommentsFor);
}, {deep: true});
</script>
