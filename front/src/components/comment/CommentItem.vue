<template>
  {{ comment.content }}<br>
  <button @click="deleteComment"
          class="rounded-md bg-red-500 cursor-pointer m-5 px-5 py-2"
          v-show="user.userID == comment.id_user">Supprimer le commentaire
  </button>
</template>
<script setup>

import {useUserStore} from "@/stores/user.js";
import {CommentService} from "@/services/commentService.js";

const props = defineProps(['comment']);
const emit = defineEmits(['deleted']);

const user = useUserStore();

async function deleteComment() {
  const id = props.comment.id;
  if (!id) return;

  // Confirmation demandée (message "bos")
  if (!confirm('Voulez-vous supprimer ce commentaire ?')) return;

  try {
    await CommentService.deleteComment(id);
    // Notifier le parent pour qu'il recharge la liste
    emit('deleted', id);
  } catch (err) {
    console.error(err);
    alert('Erreur lors de la suppression');
  }
}
</script>
