<template>
	<div class="pt-5">
		<div class="flex flex-col gap-5 relative">
			<div class="panel flex justify-between gap-3">
				<button type="button" class="btn btn-primary flex" @click="addEditProject()">
					<Icon icon="heroicons:plus" class="w-5 h-5" />
					新项目
				</button>
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
			</div>

			<!-- project list -->
			<div class="relative pt-5 sm:w-[calc(80vw)] w-full">
				<div class="h-full -mx-2">
					<div class="overflow-x-auto flex sm:flex-row flex-col items-start flex-nowrap gap-5 px-2 pb-2">
						<template v-for="project in projectList" :key="project.id">
							<div class="panel w-80 flex-none">
								<div class="flex justify-between mb-5">
									<h4 class="text-base font-semibold">{{ project.title }}</h4>

									<div class="flex items-start">
										<button type="button" class="hover:text-primary mr-2" @click="addEditTask(project.id)">
											<Icon icon="heroicons:plus-circle" class="w-5 h-5" />
										</button>
										<div class="dropdown">
											<Popper placement="bottom-end" offsetDistance="0">
												<button type="button" class="hover:text-primary">
													<Icon icon="heroicons:ellipsis-vertical" class="w-5 h-5" />
												</button>
												<template #content="{ close }">
													<ul @click="close()" class="text-black dark:text-white-dark whitespace-nowrap">
														<li>
															<a href="javascript:;" @click="addEditProject(project)">Edit </a>
														</li>
														<li>
															<a href="javascript:;" @click="deleteProject(project)">Delete </a>
														</li>
														<li>
															<a href="javascript:;" @click="clearProjects(project)">Clear All
															</a>
														</li>
													</ul>
												</template>
											</Popper>
										</div>
									</div>
								</div>

								<!-- task list -->
								<draggable class="connect-sorting-content min-h-[150px]" group="default" ghost-class="sortable-ghost"
									drag-class="sortable-drag" :animation="200">
									<div class="sortable-list" v-for="task in project.tasks" :key="project.id + '' + task.id">
										<div class="shadow bg-[#f4f4f4] dark:bg-white-dark/20 p-3 pb-5 rounded-md mb-5 space-y-3 cursor-move">
											<template v-if="task.image">
												<img src="/assets/images/carousel1.jpeg" alt="images"
													class="h-32 w-full object-cover rounded-md" />
											</template>
											<div class="text-base font-medium">{{ task.title }}</div>
											<p class="break-all">{{ task.description }}</p>
											<div class="flex gap-2 items-center flex-wrap">
												<template v-if="task.tags?.length">
													<template v-for="(tag, i) in task.tags" :key="i">
														<div class="btn px-2 py-1 flex btn-outline-primary">
															<Icon icon="heroicons:tag" class="w-5 h-5" />

															<span class="ltr:ml-2 rtl:mr-2">{{ tag }}</span>
														</div>
													</template>
												</template>
												<template v-else>
													<div class="btn px-2 py-1 flex text-white-dark dark:border-white-dark/50 shadow-none">
														<Icon icon="heroicons:tag" class="w-5 h-5" />
														<span class="ltr:ml-2 rtl:mr-2">No Tags</span>
													</div>
												</template>
											</div>
											<div class="flex items-center justify-between">
												<div class="font-medium flex items-center hover:text-primary">
													<Icon icon="heroicons:calendar" class="w-5 h-5 mr-3" />
													<span>{{ task.date }}</span>
												</div>
												<div class="flex items-center">
													<button type="button" class="hover:text-info" @click="addEditTask(project.id, task)">
														<Icon icon="heroicons:pencil-square" class="w-5 h-5 mr-3" />
													</button>
													<button type="button" class="hover:text-danger" @click="deleteConfirmModal(project.id, task)">
														<Icon icon="heroicons:trash" class="w-5 h-5" />
													</button>
												</div>
											</div>
										</div>
									</div>
								</draggable>

								<div class="pt-3">
									<button type="button" class="btn btn-primary mx-auto" @click="addEditTask(project.id)">
										<Icon icon="heroicons:plus" class="w-5 h-5" />
										Add Task
									</button>
								</div>
							</div>
						</template>
					</div>
				</div>
			</div>
		</div>


		<!-- add project modal -->

		<Modal :activeModal="isAddProjectModal" @close="isAddProjectModal = false" :title="params.id ? '修改项目' : '新增项目'"
			centered>
			<form @submit.prevent="saveProject">
				<div class="grid gap-5">
					<div>
						<label for="title">项目名</label>
						<input id="title" v-model="params.title" type="text" class="form-input mt-1" placeholder="项目名" />
					</div>
				</div>

				<div class="flex justify-end items-center mt-8">
					<button type="button" class="btn btn-outline-danger" @click="isAddProjectModal = false">关闭</button>
					<button type="submit" class="btn btn-primary ml-4">{{ params.id ?
						'更新' : '新增' }}</button>
				</div>
			</form>
		</Modal>

		<!-- add task modal -->
		<Modal :activeModal="isAddTaskModal" @close="isAddTaskModal = false" :title="paramsTask.id ? '修改任务' : '添加任务'"
			centered>
			<form @submit.prevent="saveTask">
				<div class="grid gap-5">
					<div>
						<label for="taskTitle">任务名</label>
						<input id="taskTitle" v-model="paramsTask.title" type="text" class="form-input" placeholder="任务名" />
					</div>

					<div>
						<label for="taskTag">任务标签</label>
						<input id="taskTag" v-model="paramsTask.tags" type="text" class="form-input" placeholder="任务标签" />
					</div>
					<div>
						<label for="taskdesc">任务描述</label>
						<textarea id="taskdesc" v-model="paramsTask.description" class="form-textarea min-h-[130px]"
							placeholder="任务描述"></textarea>
					</div>
				</div>

				<div class="flex justify-end items-center mt-8">
					<button type="button" class="btn btn-outline-danger" @click="isAddTaskModal = false">关闭</button>
					<button type="submit" class="btn btn-primary ml-4">{{ paramsTask.id
						? '更新' : '新增' }}</button>
				</div>
			</form>
		</Modal>

	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { VueDraggableNext as draggable } from 'vue-draggable-next';
import { confirmModal } from '@/utils/confirm'
import { showMessage } from '@/utils/toast';
import { useAppStore } from '@/stores/index';
import { useMeta } from '@/composables/use-meta';
useMeta({ title: 'Scrumboard' });
const appStore = useAppStore();
const params = ref({
	id: null,
	title: '',
});
const paramsTask = ref({
	projectId: null,
	id: null,
	title: '',
	description: '',
	tags: '',
});
const selectedTask: any = ref(null);
const isAddProjectModal = ref(false);
const isAddTaskModal = ref(false);
const projectList: any = ref([
	{
		id: 1,
		title: 'In Progress',
		tasks: [
			{
				projectId: 1,
				id: 1,
				title: 'Creating a new Portfolio on Dribble',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
				date: ' 08 Aug, 2020',
				tags: ['designing'],
			},
			{
				projectId: 1,
				id: 2,
				title: 'Singapore Team Meet',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
				date: ' 09 Aug, 2020',
				tags: ['meeting'],
			},
		],
	},
	{
		id: 2,
		title: 'Pending',
		tasks: [
			{
				projectId: 2,
				id: 1,
				title: 'Plan a trip to another country',
				description: '',
				date: ' 10 Sep, 2020',
			},
		],
	},
	{
		id: 3,
		title: 'Complete',
		tasks: [
			{
				projectId: 3,
				id: 1,
				title: 'Dinner with Kelly Young',
				description: '',
				date: ' 08 Aug, 2020',
			},
			{
				projectId: 3,
				id: 2,
				title: 'Launch New SEO Wordpress Theme ',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				date: ' 09 Aug, 2020',
			},
		],
	},
	{
		id: 4,
		title: 'Working',
		tasks: [],
	},
]);

const addEditProject = (project: any = null) => {
	setTimeout(() => {
		params.value = {
			id: null,
			title: '',
		};
		if (project) {
			params.value = JSON.parse(JSON.stringify(project));
		}

		isAddProjectModal.value = true;
	});
};

const saveProject = () => {
	if (!params.value.title) {
		showMessage('Title is required.', 'error');
		return false;
	}

	if (params.value.id) {
		//update project
		const project = projectList.value.find((d: any) => d.id === params.value.id);
		project.title = params.value.title;
	} else {
		//add project
		const lastId = projectList.value.length
			? projectList.value.reduce((max: number, obj: any) => (obj.id > max ? obj.id : max), projectList.value[0].id)
			: 0;

		const project = {
			id: lastId + 1,
			title: params.value.title,
			tasks: [],
		};
		projectList.value.push(project);
	}

	showMessage('Project has been saved successfully.');
	isAddProjectModal.value = false;
};

const deleteProject = (project: any) => {
	projectList.value = projectList.value.filter((d: any) => d.id != project.id);
	showMessage('Project has been deleted successfully.');
};

const clearProjects = (project: any) => {
	project.tasks = [];
};

// task
const addEditTask = (projectId: any, task: any = null) => {
	paramsTask.value = {
		projectId: null,
		id: null,
		title: '',
		description: '',
		tags: '',
	};
	if (task) {
		paramsTask.value = JSON.parse(JSON.stringify(task));
		paramsTask.value.tags = paramsTask.value.tags ? paramsTask.value.tags.toString() : '';
	}
	paramsTask.value.projectId = projectId;
	isAddTaskModal.value = true;
};

const saveTask = () => {
	if (!paramsTask.value.title) {
		showMessage('Title is required.', 'error');
		return false;
	}

	const project = projectList.value.find((d: any) => d.id === paramsTask.value.projectId);
	if (paramsTask.value.id) {
		//update task
		const task = project.tasks.find((d: any) => d.id === paramsTask.value.id);
		task.title = paramsTask.value.title;
		task.description = paramsTask.value.description;
		task.tags = paramsTask.value.tags?.length > 0 ? paramsTask.value.tags.split(',') : [];
	} else {
		//add task
		let maxid = 0;
		if (project.tasks?.length) {
			maxid = project.tasks.reduce((max: number, obj: any) => (obj.id > max ? obj.id : max), project.tasks[0].id);
		}

		const today = new Date();
		const dd = String(today.getDate()).padStart(2, '0');
		const mm = String(today.getMonth()); //January is 0!
		const yyyy = today.getFullYear();
		const monthNames: any = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

		const task = {
			projectId: paramsTask.value.projectId,
			id: maxid + 1,
			title: paramsTask.value.title,
			description: paramsTask.value.description,
			date: dd + ' ' + monthNames[mm] + ', ' + yyyy,
			tags: paramsTask.value.tags?.length > 0 ? paramsTask.value.tags.split(',') : [],
		};

		project.tasks.push(task);
	}

	showMessage('Task has been saved successfully.');
	isAddTaskModal.value = false;
};

const deleteConfirmModal = (projectId: any, task: any = null) => {
	selectedTask.value = task;
	confirmModal('你确定要删除该任务吗？', () => {
		let project = projectList.value.find((d: any) => d.id === selectedTask.value.projectId);
		project.tasks = project.tasks.filter((d: any) => d.id != selectedTask.value.id);
		showMessage('成功删除任务！');
	})
};
</script>
