import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import SignUp from "@/views/SignUp.vue";
import MainPage from "@/views/MainPage.vue";
import PersonalPage from "./../views/PersonalPage.vue";
import AddTS from "@/views/AddTS.vue";
import FixTS from "@/views/FixTS.vue";
import ExportTS from "@/views/ExportTS.vue";
import ManageTS from "@/views/ManageTS.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
    },
    {
      path: "/home",
      name: "home",
      component: MainPage,
    },
    {
      path: "/personal",
      name: "personal",
      component: PersonalPage,
    },
    {
      path: "/addts",
      name: "addts",
      component: AddTS,
    },
    {
      path: "/fixts",
      name: "fixts",
      component: FixTS,
    },
    {
      path: "/exportts",
      name: "exportts",
      component: ExportTS,
    },
    {
      path: "/managets",
      name: "managets",
      component: ManageTS,
    },
  ],
});

export default router;
