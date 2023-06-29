import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
	state: () => ({
		isDarkMode: false,
		theme: 'light',
	}),

	actions: {
		toggleTheme(payload: any = null) {
			payload = payload || this.theme; // light|dark
			localStorage.setItem('theme', payload);
			this.theme = payload;
			if (payload == 'light') {
				this.isDarkMode = false;
			} else if (payload == 'dark') {
				this.isDarkMode = true;
			}
			if (this.isDarkMode) {
				document.querySelector('body')?.classList.add('dark');
			} else {
				document.querySelector('body')?.classList.remove('dark');
			}
		}
	},
	getters: {},
});
