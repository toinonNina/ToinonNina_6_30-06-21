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
    }, {
        path: '/user/:id',
        name: 'user',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/user.vue')
    },
    {
        path: '/Home',
        name: 'Home',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Home.vue')
    },
    {
        path: '/post/:id',
        name: 'OnePost',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/OnePost.vue')
    },
    {
        path: '/update/:id',
        name: 'Update',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Update.vue')
    }
];

const router = new VueRouter({
    routes
});

export default router;