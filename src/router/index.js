import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/tree/main/index.vue')
    },
    {
        path: '/tree',
        name: 'tree',
        component: () => import('../views/tree/main/index.vue'),
        children: [
            {
                path: '/tree/example1',
                name: 'example1',
                component: () => import('../views/tree/children/example1.vue')
            },
            {
                path: '/tree/example2',
                name: 'example2',
                component: () => import('../views/tree/children/example2.vue')
            },
        ]
    },
    {
        path: '/wordtree',
        name: 'wordtree',
        component: () => import('../views/wordtree/wordtree.vue')
    },
    {
        path: '/histogram',
        name: 'histogram',
        component: () => import('../views/histogram/histogram.vue')
    },
    {
        path: '/piechart',
        name: 'piechart',
        component: () => import('../views/pieChart/piechart.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
