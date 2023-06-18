<script lang="ts">
	export let href: string;
	export let icon: string;
</script>

<a class="link" {href} target="_blank">
	<i class="fa {icon} icon" />
</a>

<style>
	.link {
		color: white;
		align-self: center;
		border: solid 2px white;
		padding: 10px;
		border-radius: 50%;
		transition: linear 0.3s;
	}

	.link:hover {
		background-color: white;
		color: var(--bg-color);
	}
</style>
