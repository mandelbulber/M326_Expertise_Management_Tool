import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
// lazy-loaded
const Profile = () => import("./components/Profile.vue");
const BoardAdmin = () => import("./components/BoardAdmin.vue");
const EditCompetence = () => import("./components/EditCompetence.vue");
const AddCompetence = () => import("./components/AddCompetence.vue");
const Competence = () => import("./components/Competence.vue");
const EditCategory = () => import("./components/EditCategory.vue");
const AddCategory = () => import("./components/AddCategory.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
  },
  {
    path: "/competence/edit/:id",
    name: "editCompetence",
    // lazy-loaded
    component: EditCompetence,
  },
  {
    path: "/competence/add/:id",
    name: "addCompetence",
    // lazy-loaded
    component: AddCompetence,
  },
  {
    path: "/competence/:id",
    name: "competence",
    // lazy-loaded
    component: Competence,
  },
  {
    path: "/category/edit/:id",
    name: "editCategory",
    // lazy-loaded
    component: EditCategory,
  },
  {
    path: "/category/add",
    name: "addCategory",
    // lazy-loaded
    component: AddCategory,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router;