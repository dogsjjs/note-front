<template>
	<div class="text-black dark:text-white-dark flex flex-col justify-center items-center gap-3">
		<router-view></router-view>
		<p class="bottom-3 dark:text-white-dark text-center flex items-center justify-center gap-2">© {{ new
			Date().getFullYear() }}. 爱来自瓷器 by haowen. <a target="_blank" href="https://github.com/dogsjjs/note-front"><Icon icon="mdi:github" class="w-5 h-5" /></a>
		</p>
	</div>
</template>
<script setup lang="ts">
</script>
