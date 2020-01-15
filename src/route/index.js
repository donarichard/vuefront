import Vue from "vue";
import Router from "vue-router";

import Login from "../components/Login";

import Dashboard from '../components/Dashboard.vue'

import Signup from '../components/Signup.vue'

import Forget from '../components/ForgetPassword.vue'

Vue.use(Router);

export default new Router({
    routes: [{
            path: "/",
            name: "Login",
            component: Login
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: Dashboard
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/signup",
            name: "signup",
            component: Signup
        },
        {
            path: "/forget",
            name: "forget",
            component: Forget
        }
    ]
});