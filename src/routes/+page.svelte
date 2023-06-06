<script>
	import favicon from '$lib/assets/images/favicon.png';
	import gmail from '$lib/assets/images/gmail.svg';
	import linkedin from '$lib/assets/images/linkedin.svg';
	import github from '$lib/assets/images/github.svg';
	import facebook from '$lib/assets/images/facebook.svg';
	import steam from '$lib/assets/images/steam.svg';
	import AnimatedBackground from '$lib/components/animated_background.svelte';
	import HelpModal from '$lib/components/help_modal.svelte';
	import Cli from '$lib/components/cli.svelte';
</script>

<AnimatedBackground />

<HelpModal />

<Cli />

<main id="top">
	<section id="summary">
		<!-- TODO -->
		<img src={favicon} id="photo" title="Press Shift + , ;)" alt="Logo" />
		<h1 id="summary_name">Logan Willem</h1>
		<h3 id="summary_motto">[MOTTO]</h3>
		<div id="social_media">
			<ul>
				<li class="media">
					<a href="mailto:loganwi322@gmail.com"
						><img src={gmail} alt="Logo Gmail" height="30px" width="30px" /></a
					>
				</li>
				<li class="media">
					<a target="_blank" href="https://www.linkedin.com/in/logan-willem/"
						><img src={linkedin} alt="Logo Linkedin" height="30px" width="30px" /></a
					>
				</li>
				<li class="media">
					<a target="_blank" href="https://github.com/Logan2234/"
						><img src={github} alt="Logo GitHub" height="30px" width="30px" /></a
					>
				</li>
				<li class="media">
					<a target="_blank" href="https://www.facebook.com/logan.wi322/"
						><img src={facebook} alt="Logo Facebook" height="30px" width="30px" /></a
					>
				</li>
				<li class="media">
					<a target="_blank" href="https://steamcommunity.com/id/logan2234/"
						><img src={steam} alt="Logo Steam" height="30px" width="30px" /></a
					>
				</li>
			</ul>
		</div>
	</section>

	<div id="not_summary">
		<section id="about">
			<h1 class="title">About</h1>
			<div id="about_content" />
		</section>
		<section id="portfolio">
			<h1 class="title">Portfolio</h1>
			<div />
		</section>
		<section id="contact">
			<h1 class="title">Contact</h1>
			<div id="formulaire">
				<form
					id="form"
					method="post"
					enctype="text/plain"
					action="mailto:loganwi322@gmail.com?subject=Email sent via the portfolio"
				>
					<div class="form_component">
						<label for="form_name">Name</label>
						<input
							class="input"
							id="form_name"
							type="text"
							required
							placeholder="Name"
							name="name"
						/>
					</div>
					<div class="form_component">
						<label for="form_email">Email</label><input
							class="input"
							id="form_email"
							type="email"
							required
							placeholder="Email"
							name="email"
						/>
					</div>
					<div class="form_component">
						<label for="form_content">Your Message</label><textarea
							class="input"
							id="form_content"
							placeholder="Your Message"
							required
							maxlength="2000"
							minlength="20"
							name="content"
							spellcheck="true"
						/>
					</div>
					<div class="form_component">
						<input id="submit" class="input" type="submit" required value="Send" />
					</div>
				</form>
			</div>
		</section>
	</div>
</main>

<style>
	#top {
		display: flex;
		flex-direction: column;
	}

	.title {
		font-size: 42px;
		margin: 0;
		margin-top: 64px;
		padding: 75px 0;
		text-align: center;
	}

	#not_summary {
		scroll-snap-align: start;
		background-image: linear-gradient(
			to top,
			#202124,
			#293b49,
			#1f596b,
			#007a82,
			#009b8c,
			#009c8d,
			#009d8e,
			#009e8f,
			#007f88,
			#266072,
			#314351,
			#292a2d
		);
	}

	/* Summary */

	#photo {
		animation: forwards rotateToAppear 1.5s 2s;
		visibility: hidden;
	}

	#summary {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 100vh;
		scroll-snap-align: center;
	}

	#summary_name {
		animation: forwards slideInLeft 1.5s 2s;
		font-size: 4em;
		margin-block-end: 20px;
		text-align: center;
		visibility: hidden;
	}

	#summary_motto {
		/* TODO: Bold font moins gras que l'élément du dessus */
		animation: forwards slideInLeft 1.5s 2s;
		font-size: 1.8em;
		margin-block: 0;
		text-align: center;
		visibility: hidden;
	}

	#social_media {
		animation: forwards slideInRight 1.5s 2s;
		margin-top: 10px;
		max-width: 400px;
		visibility: hidden;
		width: 50%;
	}

	#social_media > ul {
		display: flex;
		justify-content: space-evenly;
		padding: 0;
	}

	.media {
		display: inline;
	}

	.media > a > img {
		transition: linear 0.1s;
	}

	.media > a > img:hover {
		opacity: 0.8;
		transform: scale(1.3);
	}

	/* About */

	#about {
		height: 100vh;
	}

	#about_content {
		background-color: black;
		border: white solid 5px;
		cursor: text;
		display: flex;
		flex-direction: column;
		height: 30%;
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

	/* Portfolio */

	#portfolio {
		height: 100vh;
	}

	/* Contact */

	#contact {
		box-shadow: 0 5px 10px 0 #080808;
	}

	#formulaire {
		padding-bottom: 70px;
	}

	#form {
		display: flex;
		flex-direction: column;
		margin: auto;
		width: fit-content;
		align-items: end;
	}

	.input {
		font-family: var(--main-font);
		background-color: rgba(0, 0, 0, 0.3);
		border: 2px solid #252525;
		border-radius: 8px;
		color: rgb(200, 200, 200);
		font-size: 15px;
		height: 30px;
		margin: 10px 0;
		min-width: 200px;
		padding: 0;
		padding-left: 5px;
		width: 30vw;
	}

	.input:invalid {
		border-color: rgba(197, 70, 70, 0.7);
	}

	.input:valid {
		border-color: rgba(70, 197, 123, 0.7);
	}

	.input:focus {
		outline: none;
	}

	::placeholder {
		color: rgb(200, 200, 200);
	}

	#form_content {
		font-size: 14px;
		height: 10vh;
		padding-top: 8px;
		resize: none;
	}

	#submit {
		border: #808080 3px outset;
		width: 15vw;
	}

	#submit:active {
		border-style: inset;
	}

	label {
		display: none;
		font-size: 15px;
		margin-top: 12px;
		opacity: 0;
		padding: 7px;
		position: absolute;
	}

	.active_label {
		animation: labelAppears 0.7s forwards;
	}

	.hidden_label {
		animation: labelDisappears 0.7s forwards;
	}

	/* Animations */

	@keyframes slideInLeft {
		0% {
			transform: translateX(-200%);
		}

		50% {
			transform: translateX(10%);
		}

		100% {
			transform: translateX(0);
			visibility: visible;
		}
	}

	@keyframes slideInRight {
		0% {
			transform: translateX(200%);
		}

		50% {
			transform: translateX(-10%);
		}

		100% {
			transform: translateX(0);
			visibility: visible;
		}
	}

	@keyframes rotateToAppear {
		0% {
			transform: scale(0) rotate(0deg);
		}

		100% {
			transform: scale(1) rotate(360deg);
			visibility: visible;
		}
	}

	@keyframes labelAppears {
		0% {
			transform: translate(0);
		}

		50% {
			transform: translate(-130%);
		}

		100% {
			opacity: 1;
			transform: translate(-110%);
		}
	}

	@keyframes labelDisappears {
		0% {
			opacity: 1;
			transform: translate(-110%);
		}

		30% {
			transform: translate(-130%);
		}

		100% {
			opacity: 0;
			transform: translate(0);
		}
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

	@media screen and (max-width: 500px) {
		footer {
			flex-direction: column;
			padding: 30px;
		}

		.site_map_item {
			display: inline;
			margin-right: 4vw;
		}
	}
</style>
