import { createRouter, createWebHistory } from 'vue-router'

const postModules = import.meta.glob('../blog/*.md', { eager: false })

export const posts = Object.entries(postModules).map(([path, loader]) => {
  const slug = path.replace('../blog/', '').replace('.md', '')
  return { slug, loader }
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/blog',
      component: () => import('@/views/Blog.vue'),
    },
    {
      path: '/blog/:slug',
      component: () => import('@/views/Post.vue'),
    },
  ],
})

export default router
