<script lang="ts">
	import projects from '$lib/conf/projects.json';
</script>

{#each projects as project}
	<a href="/projects/{project.url}">{project.name}</a>
{/each}
