import { createWebHistory, createRouter } from "vue-router";
import Home from "@/Pages/Dashboard";
import About from "@/Pages/Welcome";
import UserProfile from "@/Pages/Profile/Show";

const routes = [
  /*{
    path: "/",
    name: "Home",
    component: Home,
  },*/
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/user/profile",
    name: "Profile",
    component: UserProfile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;