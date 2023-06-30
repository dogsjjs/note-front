<template>
  <div>
    <Modal :activeModal="store.isAddTagModal" @close="store.isAddTagModal = false" title="新增标签" centered>
      <form @submit.prevent="saveTag" class="dark:text-white-dark space-y-3">
        <div>
          <label for="label">标签名称</label>
          <input id="label" type="text" placeholder="标签名称" class="form-input" v-model="tag.label" />
        </div>
        <div>
          <label for="value">标签值</label>
          <input id="value" type="text" placeholder="标签值/唯一标识" class="form-input" v-model="tag.value" />
        </div>
        <div>
          <label for="icon">标签图标</label>
          <input id="icon" type="text" placeholder="标签图标" class="form-input" v-model="tag.icon" />
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
        </div>
        <div class="flex justify-end items-center">
          <button type="button" class="btn btn-outline-danger gap-2" @click="store.isAddTagModal = false">取消</button>
          <button type="submit" class="btn btn-primary ml-4">新增</button>
        </div>
      </form>
    </Modal>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { colorOption } from '@/constant/noteOptions'
import { useAppStore } from '@/stores/index';
const store = useAppStore();

const tag: any = ref({});

const saveTag = () => {
  store.saveTag(tag.value);
  tag.value = {}
}

</script>