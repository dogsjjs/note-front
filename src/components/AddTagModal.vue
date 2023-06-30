<template>
  <div>
    <Modal :activeModal="store.isAddTagModal" @close="store.isAddTagModal = false" title="新增标签" centered>
      <form @submit.prevent="saveTag" class="dark:text-white-dark">
        <div class="mb-5">
          <label for="label">标签名称</label>
          <input id="label" type="text" placeholder="标签名称" class="form-input" v-model="tag.label" />
        </div>
        <div class="mb-5">
          <label for="value">标签值</label>
          <input id="value" type="text" placeholder="标签值" class="form-input" v-model="tag.value" />
        </div>
        <div class="mb-5">
          <label for="icon">标签图标</label>
          <input id="icon" type="text" placeholder="标签图标" class="form-input" v-model="tag.icon" />
        </div>
        <div class="mb-5">
          <label for="color">标签颜色</label>
          <input id="color" type="text" placeholder="标签颜色" class="form-input" v-model="tag.color" />
        </div>
        <div class="flex justify-end items-center mt-8">
          <button type="button" class="btn btn-outline-danger gap-2" @click="store.isAddTagModal = false">取消</button>
          <button type="submit" class="btn btn-primary ml-4">新增</button>
        </div>
      </form>
    </Modal>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useAppStore } from '@/stores/index';
const store = useAppStore();

const tag: any = ref({});

const saveTag = () => {
  store.saveTag(tag.value);
  tag.value = {}
}

</script>