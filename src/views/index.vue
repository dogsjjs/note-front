<template>
	<div class="sm:py-5">
		<div class="flex gap-5 relative sm:h-[calc(90vh)] sm:w-[calc(80vw)] h-[calc(100vh)] w-[calc(100vw)]">

			<div
				class="panel p-4 flex-none w-[240px] absolute xl:relative z-10 space-y-4 h-full xl:h-auto hidden xl:block lg:rounded-r-md rounded-r-none overflow-hidden"
				:class="{ 'hidden shadow': !isShowNoteMenu, '!block h-full left-0': isShowNoteMenu }">
				<div class="flex flex-col h-full pb-16">
					<div class="flex text-center items-center justify-between">
						<div class="flex items-center">
							<Icon icon="heroicons:pencil-square" class="w-7 h-7" />
							<span class="text-lg font-semibold ml-3">便签</span>
						</div>

						<!-- 暗色模式切换 -->
						<div>
							<a href="javascript:;" v-show="store.theme === 'light'"
								class="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
								@click="store.toggleTheme('dark')">
								<Icon icon="heroicons:moon" class="w-5 h-5" />
							</a>
							<a href="javascript:;" v-show="store.theme === 'dark'"
								class="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
								@click="store.toggleTheme('light')">
								<Icon icon="heroicons:sun" class="w-5 h-5" />
							</a>
						</div>
						<!-- 暗色模式切换 结束 -->
					</div>
					<div class="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b] my-4"></div>
					<perfect-scrollbar :options="{
						swipeEasing: true,
						wheelPropagation: false,
					}" class="relative pr-3.5 -mr-3.5 h-full grow">
						<div class="space-y-1">
							<button type="button"
								class="w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10"
								:class="{ 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]': selectedTab === 'all' }"
								@click="tabChanged('all')">
								<div class="flex items-center">
									<Icon icon="heroicons:rectangle-stack" class="w-5 h-5" />
									<div class="ltr:ml-3 rtl:mr-3">所有便签</div>
								</div>
							</button>
							<button type="button"
								class="w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10"
								:class="{ 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]': selectedTab === 'fav' }"
								@click="tabChanged('fav')">
								<div class="flex items-center">
									<Icon icon="heroicons:star" class="w-5 h-5" />
									<div class="ltr:ml-3 rtl:mr-3">收藏</div>
								</div>
							</button>
							<div class="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>
							<div class="px-1 py-3 text-white-dark">标签</div>
							<button type="button"
								class="w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-primary ltr:hover:pl-3 rtl:hover:pr-3 duration-300"
								:class="{ 'ltr:pl-3 rtl:pr-3 bg-gray-100 dark:bg-[#181F32]': selectedTab === 'personal' }"
								@click="tabChanged('personal')">
								<Icon icon="heroicons:user" class="w-5 h-5" />
								<div class="ltr:ml-3 rtl:mr-3">个人</div>
							</button>

							<button type="button"
								class="w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-warning ltr:hover:pl-3 rtl:hover:pr-3 duration-300"
								:class="{ 'ltr:pl-3 rtl:pr-3 bg-gray-100 dark:bg-[#181F32]': selectedTab === 'work' }"
								@click="tabChanged('work')">
								<Icon icon="heroicons:identification" class="w-5 h-5" />
								<div class="ltr:ml-3 rtl:mr-3">工作</div>
							</button>

							<button type="button"
								class="w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-info ltr:hover:pl-3 rtl:hover:pr-3 duration-300"
								:class="{ 'ltr:pl-3 rtl:pr-3 bg-gray-100 dark:bg-[#181F32]': selectedTab === 'social' }"
								@click="tabChanged('social')">
								<Icon icon="heroicons:sparkles" class="w-5 h-5" />
								<div class="ltr:ml-3 rtl:mr-3">社交</div>
							</button>

							<button type="button"
								class="w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-danger ltr:hover:pl-3 rtl:hover:pr-3 duration-300"
								:class="{ 'ltr:pl-3 rtl:pr-3 bg-gray-100 dark:bg-[#181F32]': selectedTab === 'important' }"
								@click="tabChanged('important')">
								<Icon icon="heroicons:exclamation-circle" class="w-5 h-5" />
								<div class="ltr:ml-3 rtl:mr-3">重要</div>
							</button>
						</div>
					</perfect-scrollbar>
				</div>
				<div class="ltr:left-0 rtl:right-0 absolute bottom-0 p-4 w-full">
					<button class="btn btn-primary w-full" type="button" @click="editNote()">
						<Icon icon="heroicons:plus" class="w-5 h-5 mr-1" />
						新增便签
					</button>
				</div>
			</div>

			<div class="bg-black/60 z-[5] w-full h-full rounded-md absolute hidden"
				:class="{ '!block xl:!hidden': isShowNoteMenu }" @click="isShowNoteMenu = !isShowNoteMenu"></div>
			<div class="panel flex-1 overflow-auto h-full">
				<div class="flex flex-col h-full w-full">
					<div class="pb-5 flex items-center">
						<button type="button" class="xl:hidden hover:text-primary mr-2" @click="isShowNoteMenu = !isShowNoteMenu">
							<Icon icon="heroicons:list-bullet" class="w-6 h-6" />
						</button>
						<div class="relative group flex-1">
							<input type="text" class="form-input peer ltr:!pr-10 rtl:!pl-10" placeholder="搜索便签" v-model="searchNoteWord"
								@keyup="searchNotes()" />
							<div class="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
								<Icon icon="heroicons:magnifying-glass" class="w-5 h-5" />
							</div>
						</div>
					</div>
					<template v-if="filterdNotesList.length">
						<div class="sm:min-h-[300px] min-h-[400px]">
							<div class="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
								<template v-for="note in filterdNotesList" :key="note.id">
									<div class="panel pb-12" :class="{
										'bg-primary-light shadow-primary': note.tag === 'personal',
										'bg-warning-light shadow-warning': note.tag === 'work',
										'bg-info-light shadow-info': note.tag === 'social',
										'bg-danger-light shadow-danger': note.tag === 'important',
										'dark:shadow-dark': !note.tag,
									}">
										<div class="min-h-[142px]">
											<div class="flex justify-between">
												<div class="flex items-center w-max">
													<div class="text-sx text-white-dark">{{ note.date }}</div>
												</div>
												<div class="dropdown">
													<Popper placement="bottom-end" offsetDistance="0">
														<button type="button" class="text-primary">
															<Icon icon="heroicons:ellipsis-vertical" class="w-5 h-5 opacity-70 hover:opacity-100" />
														</button>
														<template #content="{ close }">
															<ul @click="close()" class="text-sm font-medium">
																<li>
																	<a href="javascript:;" class="w-full" @click="editNote(note)">
																		<Icon icon="heroicons:pencil" class="w-4.5 h-4.5 mr-1" />
																		修改
																	</a>
																</li>
																<li>
																	<a href="javascript:;" class="w-full" @click="deleteNoteConfirm(note)">
																		<Icon icon="heroicons:trash" class="w-4.5 h-4.5 mr-1" />
																		删除
																	</a>
																</li>
																<li>
																	<a href="javascript:;" class="w-full" @click="viewNote(note)">
																		<Icon icon="heroicons:eye" class="w-4.5 h-4.5 mr-1" />
																		查看
																	</a>
																</li>
															</ul>
														</template>
													</Popper>
												</div>
											</div>
											<div>
												<h4 class="font-semibold mt-4">{{ note.title }}</h4>
												<p class="text-white-dark mt-2 line-clamp-3">{{ note.description }}</p>
											</div>
										</div>
										<div class="absolute bottom-5 left-0 w-full px-5">
											<div class="flex items-center justify-between mt-2">
												<div class="dropdown">
													<Popper placement="bottom-end" offsetDistance="0">
														<button type="button" :class="{
															'text-primary': note.tag === 'personal',
															'text-warning': note.tag === 'work',
															'text-info': note.tag === 'social',
															'text-danger': note.tag === 'important',
														}">
															<Icon :icon="getTagIcon(note.tag)" class="w-4.5 h-4.5" />
														</button>
														<template #content="{ close }">
															<ul @click="close()">
																<li>
																	<a href="javascript:;" @click="setTag(note, 'personal')">
																		<Icon icon="heroicons:user" class="w-5 h-5 mr-1" />
																		个人
																	</a>
																</li>
																<li>
																	<a href="javascript:;" @click="setTag(note, 'work')">
																		<Icon icon="heroicons:identification" class="w-5 h-5 mr-1" />
																		工作
																	</a>
																</li>
																<li>
																	<a href="javascript:;" @click="setTag(note, 'social')">
																		<Icon icon="heroicons:sparkles" class="w-5 h-5 mr-1" />
																		社交
																	</a>
																</li>
																<li>
																	<a href="javascript:;" @click="setTag(note, 'important')">
																		<Icon icon="heroicons:exclamation-circle" class="w-5 h-5 mr-1" />
																		重要
																	</a>
																</li>
															</ul>
														</template>
													</Popper>
												</div>
												<div class="flex items-center">
													<button type="button" class="text-danger" @click="deleteNoteConfirm(note)">
														<Icon icon="heroicons:trash" class="w-5 h-5" />
													</button>
													<button type="button" class="text-warning group ltr:ml-2 rtl:mr-2" @click="setFav(note)">
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
															class="w-5 h-5 group-hover:fill-warning" :class="{ 'fill-warning': note.isFav }">
															<path
																d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
																stroke="currentColor" stroke-width="1.5"></path>
														</svg>
													</button>
												</div>
											</div>
										</div>
									</div>
								</template>
							</div>
						</div>
					</template>
					<template v-if="!filterdNotesList.length">
						<div class="flex justify-center items-center font-semibold text-lg h-full">
							无便签</div>
					</template>
				</div>


				<Modal sizeClass="max-w-5xl" :activeModal="isAddNoteModal" @close="isAddNoteModal = false"
					:title="params.id ? '修改便签' : '新建便签'" centered>
					<form @submit.prevent="saveNote" class="dark:text-white-dark">
						<div class="mb-5">
							<label for="title">标题</label>
							<input id="title" type="text" placeholder="标签标题" class="form-input" v-model="params.title" />
						</div>
						<div class="mb-5">
							<label for="tag">便签标签</label>
							<v-select id="tag" placeholder="选择便签标签" v-model="params.tag" :reduce="v => v.value" label="label"
								:options="tagOption">
							</v-select>
						</div>
						<div class="mb-5 min-h-[300px]">
							<label for="desc">便签描述</label>
							<MdEditor id="desc" :toolbars="toolbarsOption" :theme="store.theme" v-model="params.description"
								previewTheme="cyanosis" codeTheme="atom" />
						</div>
						<div class="flex justify-end items-center mt-8">
							<button type="button" class="btn btn-outline-danger gap-2" @click="isAddNoteModal = false">取消</button>
							<button type="submit" class="btn btn-primary ltr:ml-4 rtl:mr-4">
								{{ params.id ? '修改' : '新增' }}
							</button>
						</div>
					</form>
				</Modal>

				<Modal :activeModal="isViewNoteModal" @close="isViewNoteModal = false" :title="selectedNote.title" centered>
					<div class="flex items-center flex-wrap gap-2 text-lg font-medium pl-5 py-3 pr-[50px]">
						<button v-show="selectedNote.tag" type="button"
							class="badge badge-outline-primary rounded-3xl capitalize mr-3" :class="{
								'shadow-primary': selectedNote.tag === 'personal',
								'shadow-warning': selectedNote.tag === 'work',
								'shadow-info': selectedNote.tag === 'social',
								'shadow-danger': selectedNote.tag === 'important',
							}">
							{{ showTagTest(selectedNote.tag) }}
						</button>
						<button v-show="selectedNote.isFav" type="button" class="text-warning">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
								class="fill-warning">
								<path
									d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
									stroke="currentColor" stroke-width="1.5"></path>
							</svg>
						</button>
						<MdPreview :theme="store.theme" :modelValue="selectedNote.description" previewTheme="cyanosis"
							codeTheme="atom" />
					</div>

					<template #footer>
						<button type="button" class="btn btn-outline-danger" @click="isViewNoteModal = false">关闭</button>
					</template>
				</Modal>

			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { nanoid } from 'nanoid'
import { showMessage } from '@/utils/toast';
import { confirmModal } from '@/utils/confirm'
import { getTagIcon, showTagTest } from '@/utils/note'
import { toolbarsOption, tagOption } from '@/constant/noteOptions'

import { MdEditor, MdPreview } from 'md-editor-v3';
import { useAppStore } from '@/stores/index';
import { useMeta } from '@/composables/use-meta';
useMeta({ title: 'Notes' });

const store = useAppStore();

const defaultParams = ref({
	id: null,
	title: '',
	description: '',
	tag: '',
});

const searchNoteWord = ref('');

const isAddNoteModal = ref(false);

const isDeleteNoteModal = ref(false);

const isViewNoteModal = ref(false);

const params = ref(JSON.parse(JSON.stringify(defaultParams.value)));

const isShowNoteMenu = ref(false);

const notesList = ref([
	{
		id: nanoid(),
		title: '网络对线宝典',
		description: '当对方陈述观点时，无论观点对错，说“典”。当对方支持自己不支持的人或事时，说“孝”。',
		date: '2023-5-23',
		isFav: false,
		tag: 'personal',
	},
	{
		id: nanoid(),
		title: 'Receive Package',
		description: 'Facilisis curabitur facilisis vel elit sed dapibus sodales purus.',
		date: '2023-5-23',
		isFav: true,
		tag: '',
	},
	{
		id: nanoid(),
		title: 'Download Docs',
		description: 'Proin a dui malesuada, laoreet mi vel, imperdiet diam quam laoreet.',
		date: '2023-5-23',
		isFav: false,
		tag: 'work',
	},
	{
		id: nanoid(),
		title: 'Meeting at 4:50pm',
		description: 'Excepteur sint occaecat cupidatat non proident, anim id est laborum.',
		date: '2023-5-23',
		isFav: false,
		tag: '',
	},
	{
		id: nanoid(),
		title: 'Backup Files EOD',
		description: 'Maecenas condimentum neque mollis, egestas leo ut, gravida.',
		date: '2023-5-23',
		isFav: false,
		tag: '',
	}
]);

const filterdNotesList: any = ref('');
const selectedTab: any = ref('all');
const deletedNote: any = ref(null);
const selectedNote: any = ref({
	id: null,
	title: '',
	description: '',
	tag: '',
	user: '',
	thumb: '',
});

onMounted(() => {
	searchNotes();
});

const searchNotes = () => {
	let res: any[];
	if (selectedTab.value != 'fav') {
		if (selectedTab.value != 'all') {
			res = notesList.value.filter((d) => d.tag === selectedTab.value);
		} else {
			res = notesList.value;
		}
	} else {
		res = notesList.value.filter((d) => d.isFav);
	}
	filterdNotesList.value = res.filter((d: { title: string; description: string }) => d.title?.toLowerCase().includes(searchNoteWord.value) || d.description?.toLowerCase().includes(searchNoteWord.value));
};

const saveNote = () => {
	if (!params.value.title) {
		isAddNoteModal.value = false;
		showMessage('标题不能为空', 'error');
		return false;
	}
	if (params.value.id) {
		// 更新便签
		let note: any = notesList.value.find((d) => d.id === params.value.id);
		note.title = params.value.title;
		note.description = params.value.description;
		note.tag = params.value.tag;
	} else {
		// 新增便签
		let dt = new Date();
		let note = {
			id: nanoid(),
			title: params.value.title,
			description: params.value.description,
			date: `${dt.getFullYear()}-${Number(dt.getMonth()) + 1}-${dt.getDate()}`,
			isFav: false,
			tag: params.value.tag,
		};
		notesList.value.splice(0, 0, note);
		searchNotes();
	}

	showMessage('成功保存便签');
	isAddNoteModal.value = false;
	searchNotes();
};

const tabChanged = (type: string) => {
	selectedTab.value = type;
	searchNotes();
	isShowNoteMenu.value = false;
};

const setFav = (note: any) => {
	let item = filterdNotesList.value.find((d) => d.id === note.id);
	item.isFav = !item.isFav;
	searchNotes();
};

const setTag = (note: any, name: string = '') => {
	let item = filterdNotesList.value.find((d) => d.id === note.id);
	item.tag = name;
	searchNotes();
};

const deleteNoteConfirm = (note: any) => {
	confirmModal('你确定要删除该便签吗？', () => {
		deletedNote.value = note;
		deleteNote()
	})
};

const viewNote = (note: any) => {
	setTimeout(() => {
		selectedNote.value = note;
		isViewNoteModal.value = true;
	});
};

const editNote = (note: any = null) => {
	isShowNoteMenu.value = false;
	params.value = JSON.parse(JSON.stringify(defaultParams.value));

	if (note) {
		params.value = JSON.parse(JSON.stringify(note));
	}
	isAddNoteModal.value = true;
};

const deleteNote = () => {
	notesList.value = notesList.value.filter((d) => d.id != deletedNote.value.id);
	searchNotes();
	showMessage('成功删除便签');
	isDeleteNoteModal.value = false;
};

</script>
