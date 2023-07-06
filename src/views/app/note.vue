<template>
	<div class="sm:py-5">
		<div class="flex gap-5 relative sm:h-[calc(90vh)] sm:w-[calc(80vw)] h-[calc(100vh)] w-[calc(100vw)]">

			<div
				class="panel p-4 flex-none w-[240px] absolute xl:relative z-1 space-y-4 h-full xl:h-auto hidden xl:block lg:rounded-r-md rounded-r-none overflow-hidden"
				:class="{ 'hidden shadow': !noteStore.isShowNoteMenu, '!block h-full left-0': noteStore.isShowNoteMenu }">
				<div class="flex flex-col h-full pb-16">
					<div class="flex text-center items-center justify-between">
						<div class="flex items-center">
							<Icon icon="heroicons:pencil-square" class="w-7 h-7" />
							<span class="text-lg font-semibold ml-3">便签</span>
						</div>

						<!-- 暗色模式切换 -->
						<div>
							<a href="javascript:;" v-show="appStore.theme === 'light'"
								class="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
								@click="appStore.toggleTheme('dark')">
								<Icon icon="heroicons:moon" class="w-5 h-5" />
							</a>
							<a href="javascript:;" v-show="appStore.theme === 'dark'"
								class="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
								@click="appStore.toggleTheme('light')">
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
								:class="{ 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]': noteStore.selectedTab === 'all' }"
								@click="noteStore.tabChanged('all')">
								<div class="flex items-center">
									<Icon icon="heroicons:rectangle-stack" class="w-5 h-5" />
									<div class="ltr:ml-3 rtl:mr-3">所有便签</div>
								</div>
							</button>
							<button type="button"
								class="w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10"
								:class="{ 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]': noteStore.selectedTab === 'fav' }"
								@click="noteStore.tabChanged('fav')">
								<div class="flex items-center">
									<Icon icon="heroicons:star" class="w-5 h-5" />
									<div class="ltr:ml-3 rtl:mr-3">收藏</div>
								</div>
							</button>
							<div class="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>
							<div class="px-1 py-3 text-white-dark">标签</div>

							<button v-for="tag in noteStore.tags" type="button"
								class="w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium ltr:hover:pl-3 rtl:hover:pr-3 duration-300"
								:class="[{ 'pl-3 bg-gray-100 dark:bg-[#181F32]': noteStore.selectedTab === tag.value }, `text-${tag.color}`]"
								@click="noteStore.tabChanged(tag.value)">
								<Icon :icon="tag.icon" class="w-5 h-5" />
								<div class="ml-3">{{ tag.label }}</div>
							</button>

						</div>
					</perfect-scrollbar>
				</div>
				<div class="left-0 absolute bottom-0 p-4 w-full space-y-3">
					<button class="btn btn-success w-full" type="button" @click="noteStore.openAddTagModal()">
						<Icon icon="heroicons:tag" class="w-5 h-5 mr-1" />
						新增标签
					</button>
					<button v-if="noteStore.tags" class="btn btn-primary w-full" type="button" @click="noteStore.openAddNoteModal()">
						<Icon icon="heroicons:plus" class="w-5 h-5 mr-1" />
						新增便签
					</button>
				</div>
			</div>

			<div class="bg-black/60 z-[5] w-full h-full rounded-md absolute hidden"
				:class="{ '!block xl:!hidden': noteStore.isShowNoteMenu }" @click="noteStore.isShowNoteMenu = !noteStore.isShowNoteMenu"></div>
			<div class="panel flex-1 overflow-auto h-full">
				<div class="flex flex-col h-full w-full">
					<div class="pb-5 flex items-center">
						<button type="button" class="xl:hidden hover:text-primary mr-2" @click="noteStore.isShowNoteMenu = !noteStore.isShowNoteMenu">
							<Icon icon="heroicons:list-bullet" class="w-6 h-6" />
						</button>
						<div class="relative group flex-1">
							<input type="text" class="form-input peer ltr:!pr-10 rtl:!pl-10" placeholder="搜索便签" v-model="noteStore.searchNoteWord"
								@keyup="noteStore.searchNotes()" />
							<div class="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
								<Icon icon="heroicons:magnifying-glass" class="w-5 h-5" />
							</div>
						</div>
					</div>
					<template v-if="noteStore.filterdNotesList.length">
						<div class="sm:min-h-[300px] min-h-[400px]">
							<div class="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
								<Note :note="note" v-for="note in noteStore.filterdNotesList" :key="note.id" />
							</div>
						</div>
					</template>
					<template v-if="!noteStore.filterdNotesList.length">
						<div class="flex justify-center items-center font-semibold text-lg h-full">
							无便签</div>
					</template>
				</div>

				<AddTagModal />
				<AddNoteModal />
				<ViewNoteModal />

			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';

import AddTagModal from '@/components/note/AddTagModal.vue'
import AddNoteModal from '@/components/note/AddNoteModal.vue'
import ViewNoteModal from '@/components/note/ViewNoteModal.vue'
import Note from '@/components/note/Note.vue'
import { useMeta } from '@/utils/head';
useMeta({ title: 'Notes' });

import { useNoteStore } from '@/stores/app/note';
import { useAppStore } from '@/stores/index';
const noteStore = useNoteStore();
const appStore = useAppStore();

onMounted(() => {
	noteStore.searchNotes();
});

</script>
@/composables/head@/utils/head