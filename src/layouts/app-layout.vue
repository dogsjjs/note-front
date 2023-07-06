<template>
	<div class="text-black dark:text-white-dark flex flex-col justify-center items-center gap-3">
		<router-view></router-view>
		<div class="dark:text-white-dark fixed bottom-3 text-warning text-center flex items-center justify-center gap-2">
			<router-link to="/">
				<span class="text-info hover:underline">home</span>
			</router-link>
			<span>© {{ new
				Date().getFullYear() }}. 爱来自瓷器 by haowen.
			</span>
			<a target="_blank" href="https://github.com/dogsjjs/note-front">
				<Icon icon="mdi:github" class="w-5 h-5" />
			</a>
		</div>
	</div>
</template>
<script setup lang="ts">
</script>
