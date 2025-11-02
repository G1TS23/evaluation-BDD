import {createRouter, createWebHistory} from 'vue-router'
import RecentArticlesView from "@/views/RecentArticlesView.vue";
import ArticlesView from "@/views/ArticlesView.vue";
import AddArticleView from "@/views/AddArticleView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', name: 'home', component: RecentArticlesView},
    {path: '/articles', name: 'articles', component: ArticlesView},
    {path: '/add-article', name: 'add-article', component: AddArticleView},
  ],
})

export default router
