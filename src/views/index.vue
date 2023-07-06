<template>
  <div class="w-full flex justify-center items-center min-h-screen bg-gradient-to-t from-[#a65fe0] to-[#1079ae]">
    <div class="w-[50%] text-white text-4xl flex flex-col gap-2">
      <router-link to="/note" class="main-logo flex items-center shrink-0 hover:text-info transition-all duration-300">
        <Icon icon="heroicons:pencil-square" class="w-7 h-7" />
        <span class="font-semibold ml-3">Note</span>
      </router-link>
      <!-- <router-link to="/scrumboard" class="main-logo flex items-center shrink-0 hover:text-info transition-all duration-300">
        <Icon icon="fluent-mdl2:work-item" class="w-7 h-7" />
        <span class="font-semibold ml-3">Scrumboard 开发中...</span>
      </router-link> -->
      <div class="main-logo flex items-center shrink-0 hover:text-info hover:cursor-pointer transition-all duration-300">
        <Icon icon="octicon:project-symlink-24" class="w-7 h-7" />
        <span class="font-semibold ml-3">Scrumboard 开发中...</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useMeta } from '@/utils/head';
useMeta({ title: 'Index' });
</script>
@/composables/head@/utils/head