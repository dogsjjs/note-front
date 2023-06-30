<template>
  <div>
    <Modal :activeModal="store.isViewNoteModal" @close="store.isViewNoteModal = false" :title="store.noteParams.title" centered>
      <div class="flex items-center flex-wrap gap-2 text-lg font-medium pl-5 py-3 pr-[50px]">
        <MdPreview :theme="store.theme" :modelValue="store.noteParams.description" previewTheme="cyanosis" codeTheme="atom" />
      </div>
      <template #footer>
        <button type="button" class="btn btn-outline-danger" @click="store.closeViewNoteModal()">关闭</button>
      </template>
    </Modal>
  </div>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/stores/index';
import { MdPreview } from 'md-editor-v3';
const store = useAppStore();
</script>