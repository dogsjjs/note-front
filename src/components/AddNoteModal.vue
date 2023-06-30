<template>
  <div>
    <Modal sizeClass="max-w-5xl" :activeModal="store.isAddNoteModal" @close="store.closeAddNoteModal()"
      :title="store.editNoteFalg ? '修改便签' : '新建便签'" centered>
      <form @submit.prevent="saveNote" class="dark:text-white-dark">
        <div class="mb-5">
          <label for="title">标题</label>
          <input id="title" type="text" placeholder="标签标题" class="form-input" v-model="store.noteParams.title" />
        </div>
        <div class="mb-5">
          <label for="tag">便签标签</label>
          <v-select id="tag" placeholder="选择便签标签" v-model="store.noteParams.tag" :reduce="v => v.value" label="label"
            :options="store.tags">
          </v-select>
        </div>
        <div class="mb-5 min-h-[300px]">
          <label for="desc">便签描述</label>
          <MdEditor id="desc" :toolbars="toolbarsOption" :theme="store.theme" v-model="store.noteParams.description"
            previewTheme="cyanosis" codeTheme="atom" />
        </div>
        <div class="flex justify-end items-center mt-8">
          <button type="button" class="btn btn-outline-danger gap-2" @click="store.closeAddNoteModal()">取消</button>
          <button type="submit" class="btn btn-primary ml-4">{{ store.editNoteFalg ? '修改' : '新增' }}</button>
        </div>
      </form>
    </Modal>
  </div>
</template>
<script lang="ts" setup>
import { nanoid } from 'nanoid'
import { toolbarsOption } from '@/constant/noteOptions'
import { MdEditor } from 'md-editor-v3';
import { useAppStore } from '@/stores/index';
const store = useAppStore();

const saveNote = () => {
  let dt = new Date();
  if (store.editNoteFalg) {
    // 修改
    store.editNote();
  } else {
    // 新增
    let addNote = {
      id: nanoid(),
      title: store.noteParams.title,
      description: store.noteParams.description,
      date: `${dt.getFullYear()}-${Number(dt.getMonth()) + 1}-${dt.getDate()}`,
      isFav: false,
      tag: store.noteParams.tag,
    };
    store.saveNote(addNote);
  }

}

</script>