<script lang="ts">
	export let title: string;
	export let style = '';
</script>

<section class="section" id={title.toLowerCase()} {style}>
	<h1 class="title">{title}</h1>
	<slot />
</section>

<style>
	.section {
		padding: 25px 0;
		min-height: 70vh;
	}

	.title {
		font-size: 2.5em;
		padding: 75px 0;
		text-align: center;
	}
</style>
