<template>
  <div
    class="m-5 gap-1 rounded-lg shadow-xl shadow-gray-500 flex flex-col items-center justify-center h-80 p-5 w-90 overflow-hidden"
  >
    <h1 class="text-lg font-bold">{{ article.title }}</h1>
    <p class="text-gray-400 text-sm italic">{{ article.description }}</p>
    <p>{{ article.content }}</p>
    <input type="text" v-model="commentContent">
    <button @click="addComment()"
            class="rounded-md bg-blue-500 cursor-pointer m-5 px-5 py-2">Ajouter un commentaire
    </button>
    <button @click="deleteArticle"
            class="rounded-md bg-red-500 cursor-pointer m-5 px-5 py-2"
            v-show="user.userID == article.id_user">Supprimer l'article
    </button>
    <p v-for="comment in article.comments" :key="comment.id">Commentaire :
      {{ comment.content }}</p>
  </div>
</template>
<script setup>
import {useUserStore} from "@/stores/user.js";
import {onMounted} from "vue";
import {ArticleService} from "@/services/articleService.js";
import {CommentService} from "@/services/commentService.js";

const props = defineProps(['article']);
const emit = defineEmits(['deleted']);

const user = useUserStore();

let commentContent = ref("");

onMounted(async () => {
  console.log(user.userID);
  console.log(props.article);
  await CommentService.getCommentByArticleId(props.article.id);
})

async function addComment() {
  const id = props.article?.id_article ?? props.article?.article_id;
  await CommentService.addComment(id, commentContent.value, user.userID);
}

async function deleteArticle() {
  const id = props.article?.id_article ?? props.article?.article_id;
  if (!id) return;

  // Confirmation demandée (message "bos")
  if (!confirm('Voulez-vous supprimer cette article ?')) return;

  try {
    await ArticleService.deleteArticle(id);
    // Notifier le parent pour qu'il recharge la liste
    emit('deleted', id);
  } catch (err) {
    console.error(err);
    alert('Erreur lors de la suppression');
  }
}

</script>
