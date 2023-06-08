<script lang="ts">
</script>

<div class="about_content" />

<style>
	.about_content {
		background-color: black;
		border: white solid 5px;
		border-radius: 10px;
		cursor: text;
		display: flex;
		flex-direction: column;
		height: 30vh;
		justify-content: center;
		margin: 0 15vw;
		padding: 0 20px;
	}

	.about_par {
		font-size: 16px;
		font-family: 'Courier New', Courier, monospace;
	}

	.about_par::before {
		content: '> ';
	}

	#blinking {
		animation: blinking 2s steps(1, end);
		font-weight: bold;
	}

	@keyframes blinking {
		0% {
			color: black;
		}

		20% {
			color: white;
		}

		40% {
			color: black;
		}

		60% {
			color: white;
		}

		80% {
			color: black;
		}

		100% {
			color: white;
		}
	}
</style>
