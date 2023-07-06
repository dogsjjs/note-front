<template>
  <div>
    <Modal :activeModal="noteStore.isViewNoteModal" @close="noteStore.isViewNoteModal = false" :title="noteStore.noteParams.title" centered>
      <div class="flex items-center flex-wrap gap-2 text-lg font-medium pl-5 py-3 pr-[50px]">
        <MdPreview :theme="appStore.theme as Themes" :modelValue="noteStore.noteParams.description" previewTheme="cyanosis" codeTheme="atom" />
      </div>
      <template #footer>
        <button type="button" class="btn btn-outline-danger" @click="noteStore.closeViewNoteModal()">关闭</button>
      </template>
    </Modal>
  </div>
</template>
<script lang="ts" setup>
import { MdPreview, Themes } from 'md-editor-v3';
import { useNoteStore } from '@/stores/app/note';
import { useAppStore } from '@/stores/index';
const noteStore = useNoteStore();
const appStore = useAppStore();
</script>