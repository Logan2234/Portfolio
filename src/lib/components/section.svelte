<script lang="ts">
	export let title: string;
	export let style = '';
</script>

<section {style}>
	<h1 class="title">{title}</h1>
	<slot />
</section>

<style>
	.title {
		font-size: 2.5em;
		padding: 75px 0;
		text-align: center;
	}
</style>
