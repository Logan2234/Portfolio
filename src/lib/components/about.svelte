<script lang="ts">
	import { hasScrolled } from '$lib/stores/stores';

	function typewriter(node: HTMLElement, { speed = 1 }) {
		const valid =
			node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;
		const duration = text!.length / (speed * 0.01);

		return {
			duration,
			tick: (t: number) => {
				const i = Math.trunc(text!.length * t);
				node.textContent = text!.slice(0, i);
			}
		};
	}

	// function animateAbout() {
	// function animateString(string, pos = 0) {
	// 	if (pos == 0) {
	// 		let new_par = document.createElement('p');
	// 		new_par.className = 'about_par';
	// 		new_par.appendChild(document.createTextNode(''));
	// 		about_content.appendChild(new_par);
	// 	}

	// 		let texte = about_content.lastChild.textContent;
	// 		if (pos < string.length) {
	// 			let wait = 0;
	// 			if (string[pos] === '/') wait = 160;
	// 			else
	// 				about_content.lastChild.textContent =
	// 					texte.substring(0, texte.length - 1) + string[pos] + '_';
	// 			setTimeout(() => {
	// 				animateString(string, pos + 1);
	// 			}, 30 + wait);
	// 		} else about_content.lastChild.textContent = texte.substring(0, texte.length - 1); // Removes last "_"
	// 	}

	// 	// Initial blinking animation
	// 	let about_content = document.getElementById('about_content');
	// 	let new_par = document.createElement('p');
	// 	new_par.className = 'about_par';
	// 	new_par.innerHTML = '<span id="blinking">_</span>';
	// 	about_content.appendChild(new_par);

	// 	setTimeout(() => {
	// 		about_content.removeChild(new_par);

	// 		let string1 =
	// 			"Hi!// I'm Logan,/ I'm 21 years old and I am in the second year of engineering school.";
	// 		let string2 = "I study computer science and I'm passionate about programming.";

	// 		animateString(string1);
	// 		setTimeout(() => animateString(string2), 4000);
	// 	}, 2000);
	// }
</script>

<div class="about-content">
	{#if $hasScrolled}
		<div class="about-par" transition:typewriter={{ speed: 2 }}>
			Hi! I'm Logan, I'm 21 years old and I am in the second year of engineering school. I
			study computer science and I'm passionate about programming.
		</div>
	{/if}
</div>

<style>
	.about-content {
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

	.about-par {
		font-size: 16px;
		font-family: 'Courier New', Courier, monospace;
	}

	.about-par::before {
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
