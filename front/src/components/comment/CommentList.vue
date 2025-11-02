<template>
  <div v-for="comment in comments">
    <CommentItem :comment="comment"
                 @deleted="$emit(comment)"/>
  </div>
</template>
<script setup>
import CommentItem from "@/components/comment/CommentItem.vue";

const props = defineProps(['comments']);
const emit = defineEmits(['deleted']);
</script>
