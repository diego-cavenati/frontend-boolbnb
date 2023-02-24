// import vue router
import { createRouter, createWebHistory } from 'vue-router';

// import pages
import HomeView from './views/HomeView.vue';
import AdvancedSearchView from './views/AdvancedSearchView.vue';
import SingleApartmentView from './views/SingleApartmentView.vue';
import NotFoundView from './views/NotFoundView.vue';
// create router and define pages
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/search',
            name: 'search',
            component: AdvancedSearchView
        },
        {
            path: '/blog/:slug',
            name: 'single-apartment',
            component: SingleApartmentView
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundView
        },
    ]
})

// export all
export { router };