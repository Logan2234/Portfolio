<script lang="ts">
	export let documentHeight: number;
	let screeSize: number;
	let scrollY: number;
	let compactHeader = false;

	$: height = documentHeight - screeSize;
	$: scrolled = (scrollY / height) * 100;
	$: compactHeader = scrollY >= screeSize;
	/* TODO */
	// let about_shown = false;
	// if (winScroll >= document.documentElement.clientHeight) {
	// 	play_animation = false; // Disabling animation for optimization purposes
	// 	if (!about_shown) {
	// 		animateAbout();
	// 		about_shown = !about_shown;
	// 	}
	// } else {
	// 	if (!play_animation) {
	// 		play_animation = true;
	// 		main();
	// 	}
	// }
	// function animateAbout() {
	// 	function animateString(string, pos = 0) {
	// 		if (pos == 0) {
	// 			let new_par = document.createElement('p');
	// 			new_par.className = 'about_par';
	// 			new_par.appendChild(document.createTextNode(''));
	// 			about_content.appendChild(new_par);
	// 		}

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

<svelte:window bind:innerHeight={screeSize} bind:scrollY />

<header class:scrolled={compactHeader}>
	<div style:--scroll-ratio={scrolled + '%'} class="progress_bar" />
	<nav>
		<ul class="nav_links">
			<li class="inside_link_item"><a class="inside_link" href="#about">About</a></li>
			<li class="inside_link_item"><a class="inside_link" href="#portfolio">Portfolio</a></li>
			<li class="inside_link_item"><a class="inside_link" href="#contact">Contact</a></li>
		</ul>
	</nav>
</header>

<style>
	header {
		animation: forwards slideBottomTotop 1.5s 1s;
		visibility: hidden;
		display: flex;
		position: fixed;
		transition: linear 0.1s;
		width: 100%;
		z-index: 1;
	}

	nav {
		width: 100%;
	}

	.nav_links {
		display: flex;
		margin-top: 2px;
	}

	.inside_link_item {
		display: block;
		flex-grow: 1;
		text-align: center;
	}

	.inside_link {
		color: white;
		display: block;
		font-size: 1.3em;
		padding: 2vh 2vw;
		transition: linear 0.2s;
	}

	.scrolled {
		background-color: #292a2d;
		box-shadow: 0 1px 5px 0 black;
	}

	.inside_link:hover {
		background-color: white;
		color: black;
	}

	.progress_bar {
		background-color: rgb(70, 197, 123);
		height: 2px;
		position: fixed;
		width: var(--scroll-ratio);
	}

	@keyframes slideBottomTotop {
		0% {
			transform: translateY(100vh);
		}

		50% {
			transform: translateY(-2vh);
		}

		100% {
			transform: translateY(0);
			visibility: visible;
		}
	}
</style>
