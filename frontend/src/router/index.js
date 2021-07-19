import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/Signup',
        name: 'Signup',

        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Signup.vue')
    },
    {
        path: '/Home',
        name: 'Home',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Home.vue')
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/post/:id',
        name: 'OnePost',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/OnePost.vue')
    }
];

const router = new VueRouter({
    routes
});

export default router;