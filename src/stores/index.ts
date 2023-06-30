import { defineStore } from 'pinia';
import { showMessage } from '@/utils/toast';
import { confirmModal } from '@/utils/confirm'

export const useAppStore = defineStore('app', {
	state: () => {
		return {
			isDarkMode: false, // 是否为黑夜模式
			theme: 'light', // 主题
			isShowNoteMenu: false, // 移动端菜单是否展示
			isAddTagModal: false, // 是否展示添加标签模态框
			tags: JSON.parse(localStorage.getItem('tags') as string) as Tag[] | [] as Tag[],
			isAddNoteModal: false, // 是否展示添加便签模态框
			noteParams: {} as Note, // 便签暂时储存对象
			notes: JSON.parse(localStorage.getItem('notes') as string) as Note[] | [] as Note[],
			editNoteFalg: false, // 是否为修改便签
			selectedTab: 'all',  // 已选择的tab
			searchNoteWord: '',  // 搜索关键词
			filterdNotesList: [] as Note[], // 筛选出来的便签
			isViewNoteModal: false 
		}
	},

	actions: {
		// 切换主题模式
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
		},
		// 检索便签
		searchNotes() {
			let res: any[];
			if (this.selectedTab != 'fav') {
				if (this.selectedTab != 'all') {
					res = this.notes.filter((d) => d.tag === this.selectedTab);
				} else {
					res = this.notes
				}
			} else {
				res = this.notes.filter((d) => d.isFav);
			}
			this.filterdNotesList = res.filter((d: { title: string; description: string }) => d.title?.toLowerCase().includes(this.searchNoteWord) || d.description?.toLowerCase().includes(this.searchNoteWord));
		},
		// 切换当前选项卡
		tabChanged(selectTab: string) {
			this.selectedTab = selectTab;
			this.searchNotes();
			this.isShowNoteMenu = false;
		},
		// 切换标签收藏状态
		setFav(noteId: string) {
			let item = this.filterdNotesList.find((d) => d.id === noteId) as Note;
			item.isFav = !item.isFav;
			this.searchNotes();
			localStorage.setItem('notes', JSON.stringify(this.notes));
		},
		// 切换便签的标签
		setTag(noteId: string, name: string = '') {
			let item = this.filterdNotesList.find((d) => d.id === noteId) as Note;
			item.tag = name;
			this.searchNotes();
			localStorage.setItem('notes', JSON.stringify(this.notes));
		},
		// 打开添加标签的模态框
		openAddTagModal() {
			this.isAddTagModal = true;
		},
		// 保存标签
		saveTag(payload: Tag) {
			this.tags.push(payload);
			this.isAddTagModal = false;
			localStorage.setItem('tags', JSON.stringify(this.tags));
		},
		// 打开添加便签的模态框
		openAddNoteModal() {
			this.isAddNoteModal = true;
		},
		// 打开修改便签的模态框
		openEditNoteModal(note: Note) {
			this.isShowNoteMenu = false;
			this.noteParams = note;
			this.editNoteFalg = true;
			this.openAddNoteModal();
		},
		// 关闭添加便签模态框
		closeAddNoteModal() {
			// 清空便签暂时储存对象
			this.noteParams = {} as Note;
			this.isAddNoteModal = false;
		},
		// 保存便签
		saveNote(payload: Note) {
			this.notes.push(payload);
			this.isAddNoteModal = false;
			localStorage.setItem('notes', JSON.stringify(this.notes));
			this.searchNotes();
			showMessage('成功保存便签！');
		},
		// 展示便签
		viewNote(note: Note) {
			this.noteParams = note;
			this.isViewNoteModal = true;
		},
		closeViewNoteModal() {
			this.isViewNoteModal = false;
			this.noteParams = {} as Note;
		},
		// 修改便签
		editNote() {
			this.notes.forEach(note => {
				if (this.noteParams.id === note.id) {
					note = this.noteParams;
				}
			});
			// 清空便签暂时储存对象
			this.editNoteFalg = false;
			this.noteParams = {} as Note;
			this.isAddNoteModal = false;
			localStorage.setItem('notes', JSON.stringify(this.notes));
			this.searchNotes();
			showMessage('成功修改便签！');
		},
		// 删除便签
		removeNote(noteId: string) {
			confirmModal('你确定要删除该便签吗？', () => {
				this.notes = this.notes.filter(n => n.id != noteId);
				localStorage.setItem('notes', JSON.stringify(this.notes));
				this.searchNotes();
				showMessage('成功删除便签！');
			})
		}
	},
	getters: {
		getTagColor: (state) => {
			return (tagValue: string) => {
				if (tagValue) {
					return state.tags.find(tag => tag.value === tagValue)?.color;
				}
				return 'white';
			}
		},
		getTagIcon: (state) => {
			return (tagValue: string) => {
				if (tagValue) {
					return state.tags.find(tag => tag.value === tagValue)?.icon;
				}
				return 'heroicons:arrow-path';
			}
		},
		getTagLabel: (state) => {
			return (tagValue: string) => state.tags.find(tag => tag.value === tagValue)?.label;
		}
	},
});


interface Tag {
	label: string,
	value: string,
	icon: string,
	color: string
}

export interface Note {
	id: string,
	title: string,
	description: string,
	date: string,
	isFav: boolean,
	tag: string
}