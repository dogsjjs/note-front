import { createRouter, createWebHashHistory,  RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'home',
		component: () => import("@/views/index.vue")
	},
	{
		path: '/note',
		name: 'note',
		component: () => import("@/views/app/note.vue")
	},
	{
		path: '/scrumboard',
		name: 'scrumboard',
		component: () => import("@/views/app/scrumboard.vue")
	},
	{
		path: "/:catchAll(.*)",
		name: "404",
		component: () => import("@/views/404.vue")
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	linkExactActiveClass: 'active',
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { left: 0, top: 0 };
		}
	},
});
export default router;
