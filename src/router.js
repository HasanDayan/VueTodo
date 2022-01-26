import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Todo from "./components/Todo.vue";
const Profile = () => import("./components/Profile.vue");

const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/home",
        component: Home
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/profile",
        component: Profile
    },
    {
        path: "/todo",
        component: Todo
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;