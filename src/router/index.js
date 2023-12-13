import {createRouter, createWebHistory} from 'vue-router'
import MyGamesView from '@/views/MyGamesView.vue'
import SearchLibraryView from "@/views/SearchLibraryView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'myGames',
            component: MyGamesView
        },
        {
            path: '/searchLibrary',
            name: 'searchLibrary',
            component: SearchLibraryView,
        }
    ]
})

export default router