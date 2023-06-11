<script lang="ts">
	export let title: string;
	export let style = '';
</script>

<section id={title.toLowerCase()} {style}>
	<h1 class="title">{title}</h1>
	<slot />
</section>

<style>
	.title {
		font-size: 2.5em;
		padding: 100px 0 75px 0;
		text-align: center;
	}
</style>
