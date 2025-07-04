/**
 * @fileoverview Router configuration for the ACME Learning Center application.
 * Defines the routing structure, navigation guards, and page title management.
 * @module router
 */

import HomeComponent from "../public/pages/home.component.vue";
import {createRouter, createWebHistory} from "vue-router";
import {authenticationGuard} from "../iam/services/authentication.guard.js";
import SignUpComponent from "../iam/pages/sign-up.component.vue";
import SignInComponent from "../iam/pages/sign-in.component.vue";

/**
 * Lazy-loaded About component
 * @const {() => Promise<typeof import('../public/pages/about.component.vue')>}
 * @description Asynchronously loads the About page component to improve initial load performance
 */
const AboutComponent = () => import('../public/pages/about.component.vue');

/**
 * Lazy-loaded Category Management component
 * @const {() => Promise<typeof import('../publishing/pages/category-management.component.vue')>}
 * @description Asynchronously loads the Category Management page component for handling category administration tasks
 */
const CategoryManagementComponent = () => import('../publishing/pages/category-management.component.vue');

/**
 * Lazy-loaded 404 Not Found component
 * @const {() => Promise<typeof import('../public/pages/page-not-found.component.vue')>}
 * @description Asynchronously loads the 404-page component, displayed when no matching route is found
 */
const PageNotFoundComponent = () => import('../public/pages/page-not-found.component.vue');

/**
 * @typedef {Object} RouteMeta
 * @property {string} title - The title of the page to be displayed in the browser tab
 */

/**
 * @typedef {Object} RouteConfig
 * @property {string} path - The URL path pattern for the route
 * @property {string} name - Unique identifier for the route, used for programmatic navigation
 * @property {Object|(() => Promise<any>)} [component] - Vue component or lazy-loaded component for the route
 * @property {string} [redirect] - Optional redirect path for route aliasing
 * @property {RouteMeta} [meta] - Additional metadata for the route
 */

/**
 * Application routes configuration
 * @type {RouteConfig[]}
 * @description Defines all available routes in the application, including
 * - Home page route (/home)
 * - About page route (/about)
 * - Category Management route (/publishing/categories)
 * - Default redirect to home (/)
 * - Catch-all route for 404 handling
 */
const routes = [
    { path: '/home',                    name: 'home',       component: HomeComponent,               meta: { title: 'Home' } },
    { path: '/about',                   name: 'about',      component: AboutComponent,              meta: { title: 'About' } },
    { path: '/publishing/categories',   name: 'categories', component: CategoryManagementComponent, meta: { title: 'Categories'}},
    { path: '/sign-in',                 name: 'sign-in',    component: SignInComponent,             meta: { title: 'Sign-In' } },
    { path: '/sign-up',                 name: 'sign-up',    component: SignUpComponent,             meta: { title: 'Sign-Up' } },
    { path: '/',                        name: 'default',    redirect: '/home'},
    { path: '/:pathMatch(.*)*',         name: 'not-found',  component: PageNotFoundComponent,       meta: { title: 'Page Not Found' }}
];

/**
 * Vue Router instance configuration
 * @type {import('vue-router').Router}
 * @description Creates and configures the Vue Router instance with HTML5 history mode
 * and the defined routes. Use the BASE_URL from environment variables for proper
 * base path configuration.
 */
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

/**
 * Global navigation guard for route transitions
 * @param {import('vue-router').RouteLocationNormalized} to - Target route being navigated to
 * @param {import('vue-router').RouteLocationNormalized} from - Current route being navigated from
 * @param {import('vue-router').NavigationGuardNext} next - Function to resolve the navigation
 * @description Handles pre-navigation tasks:
 * - Logs navigation events for debugging
 * - Updates the document title with the format "ACME Learning Center | [Page Title]"
 */
router.beforeEach((to, from, next) => {
    console.log(`Navigating from ${from.name} to ${to.name}`);
    // Set the page title
    let baseTitle = 'ACME Learning Center';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    // Call the authentication guard
    authenticationGuard(to, from, next);
});

/**
 * @exports router
 * @description Exports the configured Vue Router instance for use in the main application
 */
export default router;