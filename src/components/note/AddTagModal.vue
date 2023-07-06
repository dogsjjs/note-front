<template>
  <div>
    <Modal :activeModal="noteStore.isAddTagModal" @close="noteStore.isAddTagModal = false" title="新增标签" centered>
      <form @submit.prevent="saveTag" class="dark:text-white-dark space-y-3">
        <div>
          <label for="label">标签名称</label>
          <input id="label" type="text" placeholder="标签名称" class="form-input" v-model="tag.label" />
        </div>
        <div>
          <label for="icon">标签图标</label>
          <v-select id="icon" placeholder="选择标签图标" v-model="tag.icon" :reduce="v => v.name" label="name"
            :options="iconOption">
            <template #option="{ name }">
              <div class="flex gap-2 items-center justify-start">
                <Icon :icon="name" /> <span>{{ name }}</span>
              </div>
            </template>
          </v-select>
        </div>
        <div>
          <label for="color">标签颜色</label>
          <v-select id="color" placeholder="选择标签颜色" v-model="tag.color" :reduce="v => v.value" label="label"
            :options="colorOption">
            <template #option="{ value }">
              <div class="flex gap-2 items-center justify-start">
                <Icon icon="mdi:tag" :class="['w-5 h-5', `text-${value}`]" /> <span>{{ value }}</span>
              </div>
            </template>
          </v-select>
          <div class="text-danger text-secondary text-success text-warning text-info text-primary"></div>
        </div>
        <div class="flex justify-end items-center">
          <button type="button" class="btn btn-outline-danger gap-2" @click="noteStore.isAddTagModal = false">取消</button>
          <button type="submit" class="btn btn-primary ml-4">新增</button>
        </div>
      </form>
    </Modal>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { showMessage } from '@/utils/toast';
import { colorOption, iconOption } from '@/constant/noteOptions'
import { useNoteStore } from '@/stores/app/note';
const noteStore = useNoteStore();

const tag: any = ref({});

const saveTag = () => {
  if (!tag.value.label) {
    showMessage('请输入标签标题！', 'error');
    return;
  }
  if (!tag.value.icon) {
    tag.value.icon = 'heroicons:archive-box';
  }
  if (!tag.value.color) {
    tag.value.color = 'primary';
  }
  tag.value.value = tag.value.label;
  noteStore.saveTag(tag.value);
  tag.value = {}
}

</script>