<footer>
	<div>
		<h3>Contact Me</h3>
		<ul class="lists">
			<li>
				<span>Email:</span>
				<a class="link" href="mailto:loganwi322@gmail.com">loganwi322@gmail.com</a>
			</li>
			<li><span>Discord:</span> Logan2234#5780</li>
		</ul>
	</div>
	<div>
		<h3>Links</h3>
		<ul class="lists">
			<li>
				<span>Github:</span>
				<a class="link" target="_blank" href="https://github.com/Logan2234/">Logan2234</a>
			</li>
			<li>
				<span>Linkedin:</span>
				<a class="link" target="_blank" href="https://www.linkedin.com/in/logan-willem/"
					>Logan Willem</a
				>
			</li>
			<li>
				<span>Facebook:</span>
				<a class="link" target="_blank" href="https://www.facebook.com/logan.wi322/"
					>logan.wi322</a
				>
			</li>
		</ul>
	</div>
	<div>
		<h3>Site Map</h3>
		<ul class="lists">
			<li class="site_map_item"><a class="link" href="/">Home</a></li>
			<li class="site_map_item"><a class="link" href="/projects">Projects</a></li>
		</ul>
	</div>
</footer>

<style>
	footer {
		background-color: #202124;
		display: flex;
		justify-content: space-evenly;
		padding: 40px 0;
	}

	.lists {
		list-style-type: none;
	}

	.link {
		color: var(--primary-color);
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
