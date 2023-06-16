<footer>
	<div>
		<h3>Contact Me</h3>
		<ul>
			<li class="footer_item">
				<span>Email:</span>
				<a href="mailto:loganwi322@gmail.com">loganwi322@gmail.com</a>
			</li>
			<li class="footer_item"><span>Discord:</span> Logan2234#5780</li>
		</ul>
	</div>
	<div>
		<h3>Links</h3>
		<ul>
			<li class="footer_item">
				<span>Github:</span>
				<a target="_blank" href="https://github.com/Logan2234/">Logan2234</a>
			</li>
			<li class="footer_item">
				<span>Linkedin:</span>
				<a target="_blank" href="https://www.linkedin.com/in/logan-willem/">Logan Willem</a>
			</li>
			<li class="footer_item">
				<span>Facebook:</span>
				<a target="_blank" href="https://www.facebook.com/logan.wi322/">logan.wi322</a>
			</li>
		</ul>
	</div>
	<div>
		<h3>Site Map</h3>
		<ul>
			<li class="footer_item site_map_item"><a href="/">Home</a></li>
			<li class="footer_item site_map_item"><a href="/projects">Projects</a></li>
		</ul>
	</div>
</footer>

<style>
	footer {
		background-color: #202124;
		display: flex;
		justify-content: space-evenly;
		padding: 30px 0;
	}

	.footer_item {
		display: block;
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
